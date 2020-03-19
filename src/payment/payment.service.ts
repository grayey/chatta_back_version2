import { Injectable } from '@nestjs/common';
import { Payment } from './interfaces/payment.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';
import { tsThisType } from '@babel/types';

@Injectable()
export class TreeService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Tree') private treeModel: Model<Payment>,
    private responseService: ResponseService,
  ) {}

  async createTree(tree: Payment, req, res): Promise<Payment> {
    const newTree = new this.treeModel(tree);

    try {
      const chat_body = await newTree.save();
      if (chat_body) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'Bot has been successfully deployed',
          chat_body,
        });
      }
      return this.responseService.clientError(res, {
        success: false,
        message: 'Bot could not be deployed. Please try again',
      });
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
 
  
}
