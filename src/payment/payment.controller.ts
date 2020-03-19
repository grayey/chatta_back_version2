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
import { TreeService } from './payment.service';
import { Tree } from '../tree/interfaces/tree.interface';
import { CreatePaymentDto } from './dto/create-tree-dto';
import { TreesService } from 'src/modules/trees/trees/trees.service';

@Controller('tree')
export class TreeController {
  constructor(private treeService: TreeService) {}
  @Post()
  async createTree(
    @Body() createTreeDto: CreatePaymentDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Tree> {
    return ;
  }
  
}
