import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApikeyGuard } from '../src/auth/guards/apikey.guard';
import { Public } from './auth/decorators/nombre.decorator';

@UseGuards(ApikeyGuard)
@Controller('example')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/1')
  @Public()
  getData(): string {
    return 'hpa';
  }
}
