import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  UseGuards,
  Param,
} from "@nestjs/common";
import { OfflineService } from "./offline.service";
import { Offline } from "./interfaces/offline.interface";

import { Response, Request } from "express";
import { AuthGuard } from "../middleware/auth.guard";

// @Controller('client')

@Controller("api/v1/email")
export class OfflineController {
  constructor(private readonly offlineService: OfflineService) {}

  @Post("offline")
  async offline(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request
  ): Promise<Offline> {
    return this.offlineService.sendOfflineMessage(createOfflineDto, res, req);
  }
  @Post("call-to-action/:id")
  @UseGuards(new AuthGuard())
  async requestDemo(
    @Param("id") id,
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request
  ): Promise<Offline> {
    return this.offlineService.sendRequestDemoMessage(
      id,
      createOfflineDto,
      res,
      req
    );
  }
  @Post("meeting-scheduled")
  async scheduleMeeting(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request
  ): Promise<Offline> {
    return this.offlineService.sendScheduleMeetingMessage(
      createOfflineDto,
      res,
      req
    );
  }
}
