import { Injectable } from '@nestjs/common';
import { Setting } from './interfaces/setting.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel('Setting') private readonly settingModel: Model<Setting>,
  ) {}

  async findAll(): Promise<Setting[]> {
    return await this.settingModel.find();
  }

  async findOne(id: string): Promise<Setting> {
    return await this.settingModel.findOne({ _id: id });
  }

  async create(setting: Setting): Promise<Setting> {
    const newSetting = new this.settingModel(setting);
    return await newSetting.save();
  }

  async delete(id: string): Promise<Setting> {
    return await this.settingModel.findByIdAndRemove(id);
  }

  async update(id: string, setting: Setting): Promise<Setting> {
    return await this.settingModel.findByIdAndUpdate(id, setting, {
      new: true,
    });
  }
}
