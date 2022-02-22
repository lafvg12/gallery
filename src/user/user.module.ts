import { Module } from '@nestjs/common';
import { UserController } from '../user/controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [],
})
export class UserModule {}
