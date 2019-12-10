import { Injectable } from '@nestjs/common';
import { Setting } from './interfaces/setting.interface';
import { Tree } from '../../tree/interfaces/tree.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ResponseService } from '../../services/ResponseHandler/response-handler.service';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel('Setting') private readonly settingModel: Model<Setting>,
    @InjectModel('Tree') private readonly treeModel: Model<Tree>,
    private responseService: ResponseService,
  ) {}

  async findAll(): Promise<Setting[]> {
    return await this.settingModel.find();
  }

  async findOne(id: string, req, res): Promise<Setting> {
    try {
      const findTree = await this.treeModel
        .findOne({ setting_id: id })
        .populate('setting_id')
        .exec();
      if (findTree.setting_id) {
        return this.responseService.requestSuccessful(res, {
          success: true,
          findTree,
        });
      }
      return this.responseService.clientError(
        res,
        'could not retrieve settings',
      );
    } catch (e) {
      return this.responseService.serverError(res, 'internal server error');
    }
  }

  async create(setting: Setting): Promise<Setting> {
    const newSetting = new this.settingModel(setting);
    return await newSetting.save();
  }

  async delete(id: string, req, res): Promise<Setting> {
    try {
      const deletedSettings = await this.settingModel.deleteOne({ _id: id });
      if (deletedSettings.n) {
        const deletedBot = await this.treeModel.deleteOne({ setting_id: id });
        if (deletedBot.n) {
          return this.responseService.requestSuccessful(res, {
            success: true,
            message: 'Deleted successfully',
          });
        }
        return this.responseService.clientError(
          res,
          'Bot does not exist or had been previously deleted',
        );
      }
      return this.responseService.clientError(
        res,
        'Setting does not exist or had been previously deleted',
      );
    } catch (e) {
      return this.responseService.serverError(res, 'Internal server error');
    }
  }

  async update(id: string, setting: Setting, req, res): Promise<Setting> {
    try {
      const isFound = await this.settingModel.findById(id);
      if (!isFound) {
        return this.responseService.clientError(res, 'settings not found');
      }
      const updatedSettings = await this.settingModel.findByIdAndUpdate(
        id,
        setting,
        {
          new: true,
        },
      );
      if (updatedSettings) {
        console.log('settings');
        const isFound = await this.treeModel.findOne({ setting_id: id });
        if (!isFound) {
          return this.responseService.clientError(res, 'Bot not found');
        }
        const { chat_body } = isFound;
        console.log(chat_body[chat_body.length - 2]);
        chat_body[chat_body.length - 2].prompt = setting.fallbackMessage;
        chat_body[chat_body.length - 1].prompt = setting.delayPrompt;
        const updatedTree = await this.treeModel.updateOne(
          { setting_id: id },
          { $set: { chat_body: chat_body } },
        );
        if (!updatedTree) {
          return this.responseService.clientError(
            res,
            'tree could not be updated',
          );
        }
        return this.responseService.requestSuccessful(res, {
          success: true,
          message: 'settings updated successfully',
          isFound,
        });
      }
      return this.responseService.clientError(
        res,
        'settings could not be updated',
      );
    } catch (e) {
      return this.responseService.serverError(res, e);
    }
  }
}
