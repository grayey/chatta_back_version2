import { Module } from '@nestjs/common';
import { TreeController } from './payment.controller';
import { TreeService } from './payment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { paymentSchemas } from './schemas/payment.schema';
import { ResponseService } from '../services/ResponseHandler/response-handler.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tree', schema: paymentSchemas }])],
  controllers: [TreeController],
  providers: [TreeService, ResponseService],
})
export class TreeModule {}
