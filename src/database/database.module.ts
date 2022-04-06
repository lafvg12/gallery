import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config';
import { ConfigType } from '@nestjs/config';
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${user}:${password}@${host}/${dbName}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
