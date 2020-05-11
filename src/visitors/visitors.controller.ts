import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  Query,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { VisitorsService } from './visitors.service';
import { Visitors } from './interfaces/visitors.interface';
import { CreateVisitorsDto } from './dto/create-visitors-dto';

@Controller('visitors')
export class VisitorsController {
  constructor(private visitorsService: VisitorsService) {}
  @Post()
  async createVisitors(
    @Body() CreateVisitorsDto: CreateVisitorsDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Visitors> {
    return this.visitorsService.createVisitors(CreateVisitorsDto, res, req);
  }
  @Get(':date/:botId/:type/:limit')
  findVisitorsByRange(
    @Param('date') date,
    @Param('botId') botId,
    @Param('type') type,
    @Param('limit') limit,
  ): Promise<Visitors> {
    return this.visitorsService.findVisitorsByRange(date, botId, type, limit);
  }
  @Get('/all')
  async findAllVisitors(
    @Query('limit') limit,
    @Query('botId') botId,
  ): Promise<Visitors[]> {

    return this.visitorsService.findAllVisitors(limit, botId);
  }
  @Get(':botId')
  async findAll(@Param('botId') botId): Promise<Visitors[]> {
    return this.visitorsService.findAll(botId);
  }
  @Get()
  async findAllVisits(@Param('botId') botId): Promise<Visitors[]> {
    return this.visitorsService.findAllVisits();
  }
}
