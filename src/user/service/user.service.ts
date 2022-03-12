import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getAllUserSer() {
    return 'I am method getAllUser from service user';
  }
  async getUserById() {
    const all = await this.userModel.find().exec();
    return all;
  }
  async findOne(id: string) {
    const product = await this.userModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
