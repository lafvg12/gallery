import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  const aws: AwsConfig = {
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
  return {
    database: {
      name: process.env.POSTGRES_DATABASE,
      port: process.env.PORT,
    },
    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },
    aws,
  };
});

export interface AwsConfig {
  region: string;
  bucket: string;
  accessKeyId: string;
  secretAccessKey: string;
}
