import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.POSTGRES_DATABASE,
      port: process.env.PORT,
    },
  };
});
