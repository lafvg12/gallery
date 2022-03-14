import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../entities/image.entity';
import { Model } from 'mongoose';
import { UpdateImageDto, CreateImageDto } from '../dtos/image.dto';

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
}
