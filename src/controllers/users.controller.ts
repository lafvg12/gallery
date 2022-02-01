import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('')
  getAllUsers() {
    return {
      message: 'i am route of users',
    };
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() payload: any) {
    return {
      message: 'Created users',
      payload: payload,
    };
  }
}
