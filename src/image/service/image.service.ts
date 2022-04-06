import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import sizeOf = require('buffer-image-size');

import { Image } from '../entities/image.entity';
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

  async create(payload: CreateImageDto) {
    const image = new this.imageModel(payload);
    return await image.save();
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
    const KEY = uuidv4() + '-' + file.originalname;

    const params = {
      Bucket: this.bucket,
      Key: KEY,
      Body: file.buffer,
    };

    // const param1 = {
    //   Bucket: this.bucket,
    //   Key: KEY,
    // };
    const awsClient = new AwsClient();

    const other = await awsClient.sendFile(this.s3Client, params);

    if (other.$metadata.httpStatusCode !== 200) {
      throw new Error('Error uploading data');
    }

    const urlImage = `https://${this.bucket}.s3.amazonaws.com/${KEY}`; // awsClient.getUrl(param1, this.s3Client);
    const dimensions = sizeOf(file.buffer);
    console.log(dimensions.width, dimensions.height);

    await this.create({
      src: urlImage,
      width: dimensions.width,
      height: dimensions.height,
    });
    return urlImage;
  }
}
