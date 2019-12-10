import { Schema } from 'mongoose';

export const treeSchema = new Schema({
  company_id: { type: Schema.Types.ObjectId, ref: 'User' },
  setting_id: { type: Schema.Types.ObjectId, ref: 'Setting' },

  chat_body: {
    type: Array,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
});
