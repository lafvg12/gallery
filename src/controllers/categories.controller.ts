import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get('/')
  getQuery(
    @Query('limit') limit: 20,
    @Query('offset') offset: 1,
    @Query('brand') brand: string,
  ) {
    return `Parameter limit is ${limit} and offset is ${offset} and brand is ${brand}`;
  }
  @Get('')
  newEndpoint(): string {
    return 'i am route new';
  }

  @Get(':id')
  getCategoriesId(@Param('id') id: string) {
    return `Parameter send is ${id}`;
  }

  @Get(':id/products/:productsId')
  getAllParameters(
    @Param('id') id: string,
    @Param('productsId') productsId: string,
  ) {
    return `Parameter send is ${id} and your second is ${productsId}`;
  }
}
