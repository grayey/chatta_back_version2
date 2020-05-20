import { Module } from "@nestjs/common";

import { OfflineController } from "./offline.controller";
import { OfflineService } from "./offline.service";
import { MongooseModule } from "@nestjs/mongoose";

import { SendGridModule } from "@anchan828/nest-sendgrid";
import { EmailService } from "../services/Email/email.service";
import { ResponseService } from "../services/ResponseHandler/response-handler.service";
import { TreeController } from "../tree/tree.controller";
import { TreeService } from "../tree/tree.service";
import { treeSchema } from "../tree/schemas/tree.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Tree", schema: treeSchema }]),

    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
  ],
  controllers: [OfflineController, TreeController],
  providers: [EmailService, OfflineService, ResponseService, TreeService],
  exports: [OfflineService],
})
export class OfflineModule {}
