import { Module } from '@nestjs/common';
import * as joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'; // modulo de nest para la configuracion de variables de entorno

import { environment } from '../environments';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { UserModule } from './user/user.module';
import config from './config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        POSTGRES_DATABASE: joi.string().required(),
      }),
    }),
    CompaniesModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
