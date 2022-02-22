import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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
  @Post('/params')
  getUserById() {
    const response = this.userService.getUserById();
    return {
      response: response,
    };
  }
}
