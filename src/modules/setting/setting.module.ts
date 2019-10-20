import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SettingController } from './setting.controller';
import { SettingService } from './setting.service';
import { SettingSchema } from './schemas/setting.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Setting', schema: SettingSchema }]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingsModule {}
