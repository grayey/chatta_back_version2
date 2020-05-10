import { Schema } from 'mongoose';

export const FormsSchema = new Schema({
  // clientId: { type: Schema.Types.ObjectId, ref: 'Client' },
  form_name: {
    type: String,
    max: 50,
  },
  action_url: {
    type: String,
    max: 100,
  },
  is_payment: {
    type: String,
    max: 100,
  },
  form_fields: {
    type: Array,
    max: 255,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  // isAdmin: {
  //     type: Boolean,
  //     default: false,
  // },
  // isEnabled: { type: Boolean, default: false },
});
