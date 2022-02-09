import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { UserTypesController } from './controllers/user-types.controller';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [CompaniesModule],
  controllers: [
    AppController,
    UsersController,
    CustomersController,
    UserTypesController,
  ],
  providers: [AppService],
})
export class AppModule {}
