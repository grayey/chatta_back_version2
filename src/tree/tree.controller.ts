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
import { TreeService } from './tree.service';
import { Tree } from '../tree/interfaces/tree.interface';
import { CreateTreeDto } from './dto/create-tree-dto';
import { TreesService } from 'src/modules/trees/trees/trees.service';

@Controller('tree')
export class TreeController {
  constructor(private treeService: TreeService) {}
  @Post()
  async createTree(
    @Body() createTreeDto: CreateTreeDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Tree> {
    return this.treeService.createTree(createTreeDto, res, req);
  }
  @Get(':id')
  findOne(@Param('id') id): Promise<Tree> {
    return this.treeService.findTree(id);
  }
  @Get()
  async findAllTrees(): Promise<Tree[]> {
    return this.treeService.findAllTrees();
  }
}
