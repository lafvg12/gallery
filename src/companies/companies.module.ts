import { Module } from '@nestjs/common';
import { CompaniesService } from './services/companies.service';
import { ServicesController } from '../companies/controllers/services.controller';
import { CompaniesController } from '../companies/controllers/companies.controller';
import { ServiceService } from '../companies/services/service.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ServicesController, CompaniesController],
  providers: [CompaniesService, ServiceService],
})
export class CompaniesModule {}
