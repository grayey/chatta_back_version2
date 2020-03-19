import { Document } from 'mongoose';
export interface Payment extends Document {
  id?: string;
   reference: string;
   message: string;
   name: string;
   email: string;
   amount: number;
   status: string;
   created_at: string;


}
