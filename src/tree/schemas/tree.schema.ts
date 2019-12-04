import { Schema } from 'mongoose';

export const treeSchema = new Schema({
  company_id: {
    type: { type: Schema.Types.ObjectId, ref: 'User' },
  },
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
