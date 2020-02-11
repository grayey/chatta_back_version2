import {
  Controller,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  Get,
  Body,
  UseGuards,
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
  @Get(':date')
  findVisitorsByRange(@Param('date') date): Promise<Visitors> {
    return this.visitorsService.findVisitorsByRange(date);
  }
  @Get('all/:limit')
  async findAllVisitors(@Param('limit') limit): Promise<Visitors[]> {
    return this.visitorsService.findAllVisitors(limit);
  }
  @Get()
  async findAll(): Promise<Visitors[]> {
    return this.visitorsService.findAll();
  }
}
