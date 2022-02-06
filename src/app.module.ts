import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { ProductsService } from './services/products.service';
import { ServicesController } from './controllers/services.controller';
import { UserTypesController } from './controllers/user-types.controller';
import { ServiceService } from './services/service.service';
import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    UsersController,
    CustomersController,
    ServicesController,
    UserTypesController,
    CompaniesController,
  ],
  providers: [AppService, ProductsService, ServiceService, CompaniesService],
})
export class AppModule {}
