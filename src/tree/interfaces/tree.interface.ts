import { Document } from 'mongoose';
export interface Tree extends Document {
  id?: string;
  clientId: string;
  identity: string;
  prompt: string;
  response: object;
  date: Date;
}
