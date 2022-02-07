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
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServiceService) {}
  @Get()
  getServices() {
    return this.servicesService.getAll();
  }
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
