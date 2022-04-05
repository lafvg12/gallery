import { Module } from '@nestjs/common';
import { ImageController } from './controller/image.controller';
import { ImageService } from './service/image.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from './entities/image.entity';
import { ConfigType } from '@nestjs/config';
import config from '../../src/config';

@Module({
  controllers: [ImageController],
  providers: [
    ImageService,
    {
      provide: 'AWS_CONFIG',
      useFactory: (configService: ConfigType<typeof config>) => {
        return configService.aws;
      },
      inject: [config.KEY],
    },
  ],
  exports: [ImageService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Image.name,
        schema: ImageSchema,
      },
    ]),
  ],
})
export class ImageModule {}
