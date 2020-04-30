import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Visitors } from './interfaces/visitors.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class VisitorsService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Visitors') private visitorsModel: Model<Visitors>,
    private responseService: ResponseService,
  ) {}

  async createVisitors(visits: any, req, res): Promise<Visitors> {
    console.log('it is createdd', visits['created']);
    const newVisitors = new this.visitorsModel({
      visitors: visits['visitors'],
      botId: visits['botId'],
      created: visits['created'],
    });

    try {
      const visitors = await newVisitors.save();
      console.log('visitorss', visitors);

      if (visitors) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Visit recorded successfully',
          data: visitors,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'There was a problem saving this record. Please try again',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }

  async findVisitorsByRange(
    dates: string,
    botId: string,
    type: string,
    limit:string
  ): Promise<Visitors> {
    const dateRange = dates.split('*');
    console.log('botId', dateRange);

    if (type === 'single') {
      const time = new Date(dateRange[0]);
      const created = `${time.getMonth() +
        1}/${time.getDate()}/${time.getFullYear()}`;
      const nkjn = await this.visitorsModel
        .find({
          botId: botId,
          created,
        })
        .limit(dateRange[2] ? parseInt(dateRange[2], 10) : null);
        console.log('time', nkjn);

      return nkjn;
    }
    if (type === 'range') {
      const time1 = new Date(dateRange[0]);
      const time2 = new Date(dateRange[1]);
      const dateRange1 = `${time1.getMonth() +
        1}/${time1.getDate()}/${time1.getFullYear()}`;
      const dateRange2 = `${time2.getMonth() +
        1}/${time2.getDate()}/${time2.getFullYear()}`;
      const visits = await this.visitorsModel
        .find({
          botId,
          created_at: {
            $gte: new Date(dateRange1),
            $lt: new Date(dateRange2),
          },
        })
        .limit(limit ?parseInt(limit,10): null);
        console.log('hahaha', visits);
        return visits

    }
  }

  async findAllVisitors(limit: string, botId): Promise<Visitors[]> {
    console.log('limited', limit, botId);
    const visitors = await this.visitorsModel.find({ botId }).limit(parseInt(limit, 10));
   
    return visitors
  }
  async findAll(botId): Promise<Visitors[]> {
    console.log(botId);
    return await this.visitorsModel.find({ botId });
  }
  async findAllVisits(): Promise<Visitors[]> {
    return await this.visitorsModel.find({});
  }
}
