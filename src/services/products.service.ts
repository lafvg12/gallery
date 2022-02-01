import { Injectable } from '@nestjs/common';

import { Product } from '../entities/products.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Tomate',
      description: 'Un nuevo producto',
      price: 1000,
    },
  ];
  getAll() {
    return this.products;
  }
}
