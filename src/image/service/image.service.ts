import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../entities/image.entity';
import { Model } from 'mongoose';
import { UpdateImageDto, CreateImageDto } from '../dtos/image.dto';
import AwsClient from '../libs/index';

@Injectable()
export class ImageService {
  constructor(@InjectModel(Image.name) private imageModel: Model<Image>) {}

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
    const REGION = 'us-east-1'; //e.g. "us-east-1"
    const KEY = file.originalname;
    // Create an Amazon S3 service client object.

    const client = {
      region: REGION,
      credentials: {
        accessKeyId: 'XXXXXX',
        secretAccessKey: 'XXXXXXX',
      },
    };
    // const s3Client = new S3Client(client);
    const params = {
      Bucket: 'gallery1989', // The name of the bucket. For example, 'sample_bucket_101'.
      Key: KEY, // The name of the object. For example, 'sample_upload.txt'.
      Body: file.buffer, // The content of the object. For example, 'Hello world!".
    };

    const param1 = {
      Bucket: 'gallery1989',
      Key: KEY,
    };
    const awsClient = new AwsClient();

    const other = awsClient.sendFile(client, params).then((results) => {
      return results.$metadata.httpStatusCode;
    });
    const urlG = awsClient.getUrl(param1, client);

    return other;
  }
}
