import { Injectable } from '@nestjs/common';
import { Category } from '../entities/category.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
  getAllCategory() {
    return this.categoryModel.find().exec();
  }
}
