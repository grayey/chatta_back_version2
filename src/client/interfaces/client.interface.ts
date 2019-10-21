import { Document } from 'mongoose';
export interface Client extends Document {
  id?: string;
  fullName: string;
  email: string;
  phone: number;
  password: string;
  isVerified: boolean;
  date: Date;
  isAdmin: boolean;
}
