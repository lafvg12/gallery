import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth/auth.controller';
import { UserModule } from '../user/user.module';
@Module({
  controllers: [AuthController],
  imports: [UserModule, PassportModule],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule {}
//AuthService,
