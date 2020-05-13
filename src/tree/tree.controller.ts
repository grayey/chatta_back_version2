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
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TreeService } from './tree.service';
import { Tree } from '../tree/interfaces/tree.interface';
import { CreateTreeDto } from './dto/create-tree-dto';
import { TreesService } from 'src/modules/trees/trees/trees.service';
import { AuthGuard } from '../middleware/auth.guard';

@Controller('api/v1')
export class TreeController {
  constructor(private treeService: TreeService) { }
  @Post()
  async createTree(
    @Body() createTreeDto: CreateTreeDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Tree> {
    return this.treeService.createTree(createTreeDto, res, req);
  }

  @Get('search-id/:id')
  async findConvoBySelection(@Query('key') queryItem, @Param('id') paramItem, @Res() response) {
    return await this.treeService.getConvoById(paramItem, queryItem, response);
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Tree> {
    return this.treeService.findTree(id);
  }
  
  @Get('search/:id')
  @UseGuards(new AuthGuard())
  findByKeyword(
    @Param('id') id,
    @Query('keyword') keyword,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Tree> {
    return this.treeService.findConversationByKeyword(id, keyword, res, req);
  }
  @Get('all/:clientId')
  findTreeByClient(@Param('clientId') clientId): Promise<Tree> {
    return this.treeService.findTreeByClient(clientId);
  }
  @Get()
  async findAllTrees(): Promise<Tree[]> {
    return this.treeService.findAllTrees();
  }


  @Patch(':id')
  async deleteTree(
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
    @Body() treeDTO: CreateTreeDto,
  ): Promise<Tree[]> {
    return this.treeService.updateTree(id, treeDTO, req, res);
  }
}
