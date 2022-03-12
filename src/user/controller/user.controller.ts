import { Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('')
  getAllUser() {
    const other = this.userService.getAllUserSer();
    return {
      message: other,
    };
  }
  @Get('/mongo')
  async getMongo() {
    const other = await this.userService.getUserById();
    return other;
  }
  @Get('/:id')
  async getById(@Param('id') id: string) {
    const userId = await this.userService.findOne(id);
    return userId;
  }
  @Post('/params')
  getUserById() {
    const response = this.userService.getUserById();
    return {
      response: response,
    };
  }
}
