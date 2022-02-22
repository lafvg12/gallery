import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ServiceService } from '../services/service.service';
import { CreateServiceDto, UpdateServiceDto } from '../dtos/services.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServiceService) {}
  @Get()
  @ApiOperation({ summary: 'Get all services' })
  @Get(':id')
  getForId(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.getId(id);
  }
  @Post()
  createCompany(@Body() payload: CreateServiceDto) {
    return this.servicesService.create(payload);
  }
  @Put(':id')
  updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateServiceDto,
  ) {
    return this.servicesService.update(id, payload);
  }

  @Delete(':id')
  deleteCompany(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.delete(id);
  }
}
