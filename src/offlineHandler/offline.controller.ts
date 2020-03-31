import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { OfflineService } from './offline.service';
import { Offline } from './interfaces/offline.interface';

import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
// @Controller('client')

@Controller('email')
export class OfflineController {
  constructor(private readonly offlineService: OfflineService) {}

  @Post('offline')
  async offline(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Offline> {
    return this.offlineService.sendOfflineMessage(createOfflineDto, res, req);
  }
  @Post('request-demo')
  async requestDemo(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Offline> {
    return this.offlineService.sendRequestDemoMessage(
      createOfflineDto,
      res,
      req,
    );
  }
  @Post('meeting-scheduled')
  async scheduleMeeting(
    @Body() createOfflineDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Offline> {
    return this.offlineService.sendScheduleMeetingMessage(
      createOfflineDto,
      res,
      req,
    );
  }
}
