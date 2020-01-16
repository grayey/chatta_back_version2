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
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesInterface} from './companies.interface';

@Controller('companies')
export class CompaniesController {

    constructor(private readonly clientService: CompaniesService) { }

    @Get()
    findAll(): Promise<CompaniesInterface[]> {
        return this.clientService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<CompaniesInterface> {
        return this.clientService.findOne(id);
    }

    @Post()
    create(@Body() createClientDto): Promise<CompaniesInterface> {
        return this.clientService.create(createClientDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<CompaniesInterface> {
        return this.clientService.delete(id);
    }

    @Put(':id')
    update(@Body() updateClientDto, @Param('id') id): Promise<CompaniesInterface> {
        return this.clientService.update(id, updateClientDto);
    }

    // @Patch(':id')
    // findByIdAndToggleEnable(@Param('id') id): Promise<CompaniesInterface> {
    //     return this.clientService.findByIdAndToggleEnable(id);
    // }
}
