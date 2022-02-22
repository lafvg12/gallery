import { Module, Global } from '@nestjs/common';
const API = 'I am api';
const testU = 'i am use value';
@Global()
@Module({
  providers: [
    {
      provide: 'API',
      useValue: API,
    },
    {
      provide: 'testU',
      useValue: testU,
    },
  ],
  exports: ['API', 'testU'],
})
export class DatabaseModule {}
