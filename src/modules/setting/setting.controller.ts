import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { SettingService } from './setting.service';
import { Setting } from './interfaces/setting.interface';

@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  findAll(): Promise<Setting[]> {
    console.log("Setting Called")
    return this.settingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Setting> {
    return this.settingService.findOne(id);
  }

  @Post()
  create(@Body() createSettingDto: CreateSettingDto): Promise<Setting> {
    return this.settingService.create(createSettingDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Setting> {
    return this.settingService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updateSettingDto: CreateSettingDto,
    @Param('id') id,
  ): Promise<Setting> {
    return this.settingService.update(id, updateSettingDto);
  }
}
