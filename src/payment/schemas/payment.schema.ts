import { Schema } from 'mongoose';

export const paymentSchemas = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  reference: {
    type: String,

  },
  message: {
    type: String,

  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String,
  },
  amount: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

