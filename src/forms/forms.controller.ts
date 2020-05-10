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
import { FormsService } from './forms.service';
import { FormsInterface} from './forms.interface';

@Controller('forms')
export class FormsController {

    constructor(private readonly formService: FormsService) { }

    @Get()
    findAll(): Promise<FormsInterface[]> {
        return this.formService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id): Promise<FormsInterface> {
        return this.formService.findOne(id);
    }

    @Post()
    create(@Body() createClientDto): Promise<FormsInterface> {
        return this.formService.create(createClientDto);
    }

    @Delete(':id')
    delete(@Param('id') id): Promise<FormsInterface> {
        return this.formService.delete(id);
    }

    @Put(':id')
    update(@Body() updateClientDto, @Param('id') id): Promise<FormsInterface> {
        return this.formService.update(id, updateClientDto);
    }

    // @Patch(':id')
    // findByIdAndToggleEnable(@Param('id') id): Promise<CompaniesInterface> {
    //     return this.clientService.findByIdAndToggleEnable(id);
    // }
}
