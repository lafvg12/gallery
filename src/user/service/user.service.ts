import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

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

  createNewUser(data: CreateUserDto) {
    const newUser = new this.userModel(data);
    return newUser.save();
  }

  updateUser(id: string, changes: UpdateUserDto) {
    const product = this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndRemove(id).exec();
  }
}
