import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Res,
  Req,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TreeService } from './tree.service';
import { Tree } from '../tree/interfaces/tree.interface';
import { CreateTreeDto } from './dto/create-tree-dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('tree')
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post()
  async createTree(
    @Body() creatTreeDto: CreateTreeDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Tree> {
    return this.treeService.createTree(creatTreeDto, res, req);
  }
}
