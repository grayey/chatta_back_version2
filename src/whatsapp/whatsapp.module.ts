import { Module } from '@nestjs/common';
import { WhatsappController } from './whatsapp.controller';
import { WhatsappService } from './whatsapp.service';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  controllers: [WhatsappController],
  providers: [WhatsappService, ResponseService],
})
export class WhatsappModule {}
