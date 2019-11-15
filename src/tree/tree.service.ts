import { Injectable } from '@nestjs/common';
import { Tree } from './interfaces/tree.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TreeService {
  protected BASE_URL = process.env.BASE_URL;

  constructor(
    @InjectModel('Tree') private treeModel: Model<Tree>,
    private responseService: ResponseService,
  ) {}

  async createTree(tree: Tree, req, res): Promise<Tree> {
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
  async findTree(id: string): Promise<Tree> {
    return await this.treeModel.findOne({ _id: id });
  }
  async findAllTrees(): Promise<Tree[]> {
    return await this.treeModel.find();
  }
}
