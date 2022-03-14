import { Module } from '@nestjs/common';
import * as joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config'; // modulo de nest para la configuracion de variables de entorno

import { environment } from '../environments';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { UserModule } from './user/user.module';
import config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../src/user/entities/user.entity';
import { ImageController } from '../src/image/controller/image.controller';
import { ImageService } from '../src/image/service/image.service';
import { ImageModule } from './image/image.module';
import { Image, ImageSchema } from './image/entities/image.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        MONGO_DB: joi.string().required(),
      }),
    }),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
    DatabaseModule,
    UserModule,
    ImageModule,
  ],
  controllers: [AppController, UserController, ImageController],
  providers: [AppService, UserService, ImageService],
})
export class AppModule {}
