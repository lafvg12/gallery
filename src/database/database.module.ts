import { MongoClient } from 'mongodb';
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../config'; // 👈 i
import { ConfigType } from '@nestjs/config';
@Global()
@Module({
  imports: [
    // 👈
    MongooseModule.forRootAsync({
      // 👈 Implement Module
      useFactory: (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo;
        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, password, host, port, dbName } =
          configService.mongo; // 👈 get mongo config
        const uri = `${connection}://${user}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(dbName);
        return database;
      },
      inject: [config.KEY], //
    },
  ],
  exports: ['MONGO', MongooseModule],
})
export class DatabaseModule {}
