import { Schema } from 'mongoose';

export const paymentSchemas = new Schema({
  clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  reference: {
    type: String,
    min: 5,
    max: 50,
  },
  message: {
    type: String,
    min: 5,
    max: 100,
  },
  name: {
    type: String,
    min: 2,
    max: 15,
  },
  email: {
    type: String,
    min: 2,
    max: 20,
  },
  amount: {
    type: Number,
    min: 1,
    max: 20,
  }
});

