import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientsService } from './client.service';
import { Client } from './interfaces/client.interface';

import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
// @Controller('client')

@Controller('api/v1')
export class ClientController {
  constructor(private readonly clientService: ClientsService) {}

  @Get('client/')
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get('client/:id')
  findOne(@Param('id') id): Promise<Client> {
    return this.clientService.findOne(id);
  }
  @Get('client/:all/:clientId')
  findAllByClient(@Param('clientId') clientId): Promise<Client> {
    return this.clientService.findAllByClient(clientId);
  }
  @Post('client/new')
  create(@Body() createClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Delete('client/:id')
  delete(@Param('id') id): Promise<Client> {
    return this.clientService.delete(id);
  }

  @Put('client/:id')
  update(@Body() updateClientDto, @Param('id') id, @Query('companyId') companyId): Promise<Client> {
    console.log('companyId', companyId, id)
    return this.clientService.update(id, updateClientDto, companyId);
  }
  @Post('auth/user')
  async Authenticate(
    @Body() apiUserDto,
    @Req() req,
    @Res() res,
  ) {

    return await this.clientService.authenticateUser(apiUserDto, res);
  }

  // @Put(':id')
  // findAndUpdate(@Param('id') @Query('companyId') id): Promise<Client> {
  //   return this.clientService.findAndUpdate(id);
  // }

  @Post('client/')
  async signUp(
    @Body() createClientDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Client> {
    return this.clientService.signUp(createClientDto, res, req);
  }
  @Post('client/reset-password')
  async sendPasswordRecoveryEmail(
    @Body() createClientDto,
    @Req() res: Response,
    @Res() req: Request,
  ): Promise<Client> {
    return this.clientService.recoverPassword(createClientDto, res, req);
  }

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  testAuthRoute() {
    return {
      message: 'you did it',
    };
  }

  @Patch('client/:id')
  findByIdAndToggleEnable(@Param('id') id): Promise<Client> {
    return this.clientService.findByIdAndToggleEnable(id);
  }
}
