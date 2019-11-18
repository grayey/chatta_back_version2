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
import { ClientsService } from './client.service';
import { Client } from '../client/interfaces/client.interface';
import { CreateClientDto } from './dto/create-client-dto';
import { AuthGuard } from '@nestjs/passport';
//testingjl
@Controller('client')
export class ClientController {
  constructor(private clientService: ClientsService) {}
  @Get()
  async findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }
  @Post()
  async signUp(
    @Body() createClientDto: CreateClientDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Client> {
    return this.clientService.signUp(createClientDto, res, req);
  }
  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuthRoute() {
    return {
      message: 'you did it',
    };
  }
  @Get(':id')
  findOne(@Param('id') id): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Client> {
    return this.clientService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateClientDto: CreateClientDto,
    @Param('id') id,
  ): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }
  @Patch(':id')
  findByIdAndToggleEnable(@Param('id') id): Promise<Client> {
    return this.clientService.findByIdAndToggleEnable(id);
  }
}
