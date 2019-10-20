import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { ClientService } from './client.service';
import { Client } from './interfaces/client.interface';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
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
}
