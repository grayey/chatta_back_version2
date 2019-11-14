import { Schema } from 'mongoose';

export const clientsSchema = new Schema({
  fullName: {
    type: String,
    min: 5,
    max: 50,
  },
  email: {
    type: String,
    min: 5,
    max: 100,
  },
  phone: {
    type: String,
    min: 9,
    max: 15,
  },
  password: {
    type: String,
    min: 8,
    max: 20,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isEnabled: { type: Boolean, default: false },
});
