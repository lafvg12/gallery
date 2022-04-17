import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserModule } from '../user.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [UserModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(jest.fn())
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
