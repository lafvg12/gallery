import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { UserService } from '../service/user.service';
import { MongoIdPipe } from '../../common/mongo-id.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getAllUser() {
    const allUser = await this.userService.getUserById();
    return allUser;
  }
  @Get('/:id')
  async getUserById(@Param('id', MongoIdPipe) id: string) {
    const userId = await this.userService.findOne(id);
    return userId;
  }

  @Post('/create')
  createUser(@Body() payload: CreateUserDto) {
    const response = this.userService.createNewUser(payload);
    return response;
  }
  @Post('/update/:id')
  updateUser(
    @Body() payload: UpdateUserDto,
    @Param('id', MongoIdPipe) id: string,
  ) {
    const response = this.userService.updateUser(id, payload);
    return response;
  }
  @Delete('/:id')
  async deleteUser(@Param('id', MongoIdPipe) id: string) {
    const deleteId = await this.userService.deleteUser(id);
    return deleteId;
  }
}
