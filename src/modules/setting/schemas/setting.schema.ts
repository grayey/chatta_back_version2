import * as mongoose from 'mongoose';

export const SettingSchema = new mongoose.Schema({
  clientId: String,
  chatbotName: String,
  botImage: String,
  welcomeImage: String,
  delayPrompt: String,
  fallbackMessage: String,
  primaryColor: String,
});
