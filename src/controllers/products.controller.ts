import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
@Controller('products')
export class ProductsController {
  @Get('')
  getAll() {
    return {
      message: 'hello',
    };
  }
  @Get(':id')
  getProducts(@Param('id') id: string) {
    return `The params is ${id}`;
  }

  @Post('')
  create(@Body() payload: any) {
    return {
      message: 'action create',
      payload,
    };
  }
}
