import { Schema } from 'mongoose';

export const treeSchema = new Schema({
  question: { type: Schema.Types.ObjectId, ref: 'Client' },
  identity: {
    type: String,
    max: 100,
  },
  prompt: {
    type: String,
  },
  response: {
    type: String,
    min: 8,
    max: 20,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
