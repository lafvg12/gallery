import { Module } from '@nestjs/common';
import * as joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigType } from '@nestjs/config'; // modulo de nest para la configuracion de variables de entorno
import { MongooseModule } from '@nestjs/mongoose';

import { environment } from '../environments';
import { UserController } from './user/controller/user.controller';
import { UserService } from './user/service/user.service';
import { UserModule } from './user/user.module';
import config from './config';
import { User, UserSchema } from '../src/user/entities/user.entity';
import { ImageController } from '../src/image/controller/image.controller';
import { ImageService } from '../src/image/service/image.service';
import { ImageModule } from './image/image.module';
import { Image, ImageSchema } from './image/entities/image.entity';
import { CategoryController } from './category/controller/category.controller';
import { CategoryService } from './category/service/category.service';
import { ModuleModule } from './category/module.module';
import {
  Category,
  CategorySchema,
} from '../src/category/entities/category.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environment[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        MONGO_DB: joi.string().required(),
        MONGO_INITDB_ROOT_USERNAME: joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: joi.string().required(),
        AWS_REGION: joi.string().required(),
        AWS_BUCKET: joi.string().required(),
        AWS_ACCESS_KEY_ID: joi.string().required(),
        AWS_SECRET_ACCESS_KEY: joi.string().required(),
        API_KEY: joi.number().required(),
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
    MongooseModule.forFeature([
      {
        name: Category.name,
        schema: CategorySchema,
      },
    ]),
    DatabaseModule,
    UserModule,
    ImageModule,
    ModuleModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    UserController,
    ImageController,
    CategoryController,
  ],
  providers: [
    AppService,
    UserService,
    ImageService,
    CategoryService,
    {
      provide: 'AWS_CONFIG',
      useFactory: (configService: ConfigType<typeof config>) => {
        return configService.aws;
      },
      inject: [config.KEY],
    },
  ],
})
export class AppModule {}
