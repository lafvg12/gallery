import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config'; // modulo de nest para la configuracion de variables de entorno
import config from 'src/config';
@Injectable()
export class UserService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  getAllUserSer() {
    return 'I am method getAllUser from service user';
  }
  getUserById() {
    const apikey = this.configService.database.name;
    return apikey;
  }
}
