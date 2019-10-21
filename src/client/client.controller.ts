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
import { ClientsService } from './client.service';
import { Client } from '../client/interfaces/client.interface';
import { CreateClientDto } from './dto/create-client-dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientsService) {}
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
}
