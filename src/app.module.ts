import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsService } from './services/products.service';
import { ServicesController } from './controllers/services.controller';
import { UserTypesController } from './controllers/user-types.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    CustomersController,
    ServicesController,
    UserTypesController,
  ],
  providers: [AppService, ProductsService],
})
export class AppModule {}
