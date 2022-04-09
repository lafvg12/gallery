import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from '../service/category.service';

import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('')
  getCategory() {
    return this.categoryService.getAllCategory();
  }
}
