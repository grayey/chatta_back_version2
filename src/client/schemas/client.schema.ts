import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
  full_name: String,
  email: String,
  phone: Number,
  password: String,
  isAdmin: Boolean,
  isEnabled: { type: Boolean, default: false },
});
