import { Injectable } from '@nestjs/common';
import { Tree } from './interfaces/tree.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TokenService } from '../services/JWT/jwt.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TreeService {
  constructor(
    @InjectModel('Tree') private treeModel: Model<Tree>,
    private responseService: ResponseService,
  ) {}

  async createTree(tree: Tree, req, res): Promise<any> {
    const chatTree = [
      {
        identity: tree.identity,
        prompt: tree.prompt,
        response: {
          buttons: [],
          text: 'We offer Solutions, applications, delivery..',
        },
      },
    ];
    const newTree = new this.treeModel(tree);
    try {
      const savedTree = await newTree.save();
      if (savedTree) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'tree created successfully',
          savedTree,
        });
      }
    } catch (e) {
      return this.responseService.serverError(res, e.message);
    }
  }
}
