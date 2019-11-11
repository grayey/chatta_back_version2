import { Injectable } from '@nestjs/common';
import { Client } from './interfaces/client.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel('Client') private readonly clientModel: Model<Client>,
  ) {}

  async findAll(): Promise<Client[]> {
    return await this.clientModel.find();
  }

  async findOne(id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id: id });
  }

  async create(client: Client): Promise<Client> {
    const newClient = new this.clientModel(client);
    return await newClient.save();
  }

  async delete(id: string): Promise<Client> {
    return await this.clientModel.findByIdAndRemove(id);
  }

  async update(id: string, client: Client): Promise<Client> {
    return await this.clientModel.findByIdAndUpdate(id, client, { new: true });
  }
  async findByIdAndToggleEnable(id: string): Promise<Client> {
    return await this.clientModel.findOne({ _id: id }, (err, clientModel) => {
      clientModel.isEnabled = !clientModel.isEnabled;
      clientModel.save((err, updatedClient) => {
        return updatedClient;
      });
    });
  }
}
