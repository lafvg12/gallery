import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from '../../services/auth.service';
import { User } from '../../../user/entities/user.entity';

@ApiTags('login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'login Users' })
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
