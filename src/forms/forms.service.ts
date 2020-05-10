import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FormsInterface } from './forms.interface';
import { DbWorker } from '../utils/dbworker.utils';

@Injectable()
export class FormsService {
  public dbWork;
  constructor(
    @InjectModel('Forms') private formModel: Model<FormsInterface>,
  ) {
    this.dbWork = new DbWorker(formModel);
  }

  /**
   *  This method creates a new form
   */
  async createForm() {
    this.dbWork.create();
  }

  async findAll(): Promise<FormsInterface[]> {
    return await this.formModel.find();
  }

  async findOne(id: string): Promise<FormsInterface> {
    return await this.formModel.findOne({ _id: id });
  }

  async create(form: FormsInterface): Promise<FormsInterface> {
    const newFormsInterface = new this.formModel(form);
    return await newFormsInterface.save();
  }

  async delete(id: string): Promise<FormsInterface> {
    return await this.formModel.findByIdAndRemove(id);
  }

  async update(
    id: string,
    form: FormsInterface,
  ): Promise<FormsInterface> {
    return await this.formModel.findByIdAndUpdate(id, form, {
      new: true,
    });
  }
}
