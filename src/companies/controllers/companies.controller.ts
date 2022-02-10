import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos/companies.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll() {
    return this.companiesService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  search(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.findId(id);
  }
  @Post('')
  create(@Body() payload: CreateCompanyDto) {
    return this.companiesService.create(payload);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companiesService.delete(id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCompanyDto) {
    return this.companiesService.update(+id, payload);
  }
}
