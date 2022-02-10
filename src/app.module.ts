import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users.controller';
import { UserTypesController } from './controllers/user-types.controller';
import { CompaniesModule } from './companies/companies.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'; // modulo de nest para la configuracion de variables de entorno

import { environment } from '../environments';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
    CompaniesModule,
    DatabaseModule,
  ],
  controllers: [AppController, UsersController, UserTypesController],
  providers: [AppService],
})
export class AppModule {}
