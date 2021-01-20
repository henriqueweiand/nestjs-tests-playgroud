import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  synchronize: process.env.TYPEORM_TEST_SYNCHRONIZE
    ? JSON.parse(process.env.TYPEORM_TEST_SYNCHRONIZE)
    : false,
  migrationsRun: process.env.TYPEORM_TEST_MIGRATIONS_RUN
    ? JSON.parse(process.env.TYPEORM_TEST_MIGRATIONS_RUN)
    : true,
  logging: process.env.TYPEORM_TEST_LOGGING
    ? JSON.parse(process.env.TYPEORM_TEST_LOGGING)
    : false,
  entities: [path.join(__dirname, '/**/**/*.entity{.ts,.js}')],
  migrations: [
    path.join(
      __dirname,
      `/${
        process.env.TYPEORM_MIGRATIONS
          ? process.env.TYPEORM_MIGRATIONS
          : 'migrations'
      }/*{.ts,.js}`,
    ),
  ],
  keepConnectionAlive: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
  host: process.env.TYPEORM_TEST_HOST
    ? process.env.TYPEORM_TEST_HOST
    : 'localhost',
  port: Number(process.env.TYPEORM_TEST_PORT)
    ? Number(process.env.TYPEORM_TEST_PORT)
    : 5432,
  username: process.env.TYPEORM_TEST_USERNAME
    ? process.env.TYPEORM_TEST_USERNAME
    : 'postgres',
  password: process.env.TYPEORM_TEST_PASSWORD
    ? process.env.TYPEORM_TEST_PASSWORD
    : 'postgres',
  database: process.env.TYPEORM_TEST_DATABASE
    ? process.env.TYPEORM_TEST_DATABASE
    : 'valid_up',
};

export default config;
