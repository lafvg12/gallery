import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../entities/image.entity';
import { Model } from 'mongoose';
import { UpdateImageDto, CreateImageDto } from '../dtos/image.dto';
import { AwsConfig } from '../../config';

import AwsClient from '../libs/index';

@Injectable()
export class ImageService {
  REGION: string;
  bucket: string;
  s3Client;

  constructor(
    @InjectModel(Image.name) private imageModel: Model<Image>,
    @Inject('AWS_CONFIG')
    private readonly awsConfig: AwsConfig,
  ) {
    this.REGION = awsConfig.region;
    this.bucket = awsConfig.bucket;
    this.s3Client = {
      region: this.REGION,
      credentials: {
        accessKeyId: awsConfig.accessKeyId,
        secretAccessKey: awsConfig.secretAccessKey,
      },
    };
  }

  async getAllImages() {
    const images = this.imageModel.find().exec();
    return images;
  }

  async findOne(id: string) {
    const product = await this.imageModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateImageDto) {
    const image = new this.imageModel(payload);
    return image.save();
  }

  update(id: string, changes: UpdateImageDto) {
    const product = this.imageModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  deleteImage(id: string) {
    return this.imageModel.findByIdAndRemove(id).exec();
  }

  async sendAws(file: Express.Multer.File) {
    const REGION = this.REGION; //e.g. "us-east-1"
    const KEY = file.originalname;

    const params = {
      Bucket: this.bucket,
      Key: KEY,
      Body: file.buffer,
    };

    const param1 = {
      Bucket: this.bucket,
      Key: KEY,
    };
    const awsClient = new AwsClient();

    const other = awsClient.sendFile(this.s3Client, params).then((results) => {
      return results.$metadata.httpStatusCode;
    });
    const urlImage = awsClient.getUrl(param1, this.s3Client);
    console.log(urlImage);
    return other;
  }
}
