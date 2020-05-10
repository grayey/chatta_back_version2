import { Document } from 'mongoose';

export interface FormsInterface extends Document {
  id?: string;
  company_id: string;
  form_name: string;
  action_url: string;
  is_payment: string;
  form_fields: any[];
  created_at: Date;
  updated_at: Date;
}
