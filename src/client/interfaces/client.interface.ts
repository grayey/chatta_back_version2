import { Document } from 'mongoose';

// export interface Client {
//     id?: string;
//     Full_name: string;
//     email: string;
//     phone: number;
//     password: string;
// }
export interface Client extends Document {
  id?: string;
  clientId: string,
  fullName: string;
  email: string;
  phone: number;
  role: string;
  password: string;
  isVerified: boolean;
  date: Date;
  isAdmin: boolean;
  isCreated: boolean;
  isEnabled: boolean;
}
