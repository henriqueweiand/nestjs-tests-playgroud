import { Test } from '@nestjs/testing';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';

const getTypeOrmConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.TYPEORM_TEST_HOST
      ? process.env.TYPEORM_TEST_HOST
      : '0.0.0.0',
    port: Number(process.env.TYPEORM_TEST_PORT)
      ? Number(process.env.TYPEORM_TEST_PORT)
      : 5432,
    username: process.env.TYPEORM_TEST_USERNAME
      ? process.env.TYPEORM_TEST_USERNAME
      : 'postgres',
    password: process.env.TYPEORM_TEST_PASSWORD
      ? process.env.TYPEORM_TEST_PASSWORD
      : 'password',
    database: process.env.TYPEORM_TEST_DATABASE
      ? process.env.TYPEORM_TEST_DATABASE
      : 'customers',
    entities: [
      path.join(__dirname, '/../../../../src/**/**/*.entity{.ts,.js}'),
    ],
    synchronize: false,
    migrationsRun: true,
    logging: true,
    migrations: [
      path.join(__dirname, '/../../../../src/migrations/*{.ts,.js}'),
    ],
    cli: {
      migrationsDir: 'migrations',
    },
  } as TypeOrmModuleOptions;
};

const putDefaultConfigs = (options: ModuleMetadata) => {
  const { controllers, imports, exports, providers } = options;

  let importsUpdated: object[] = [];
  if (imports) {
    importsUpdated = importsUpdated.concat(
      [ConfigModule.forRoot(), TypeOrmModule.forRoot(getTypeOrmConfig())],
      ...imports,
    );
  }

  return {
    controllers,
    imports: importsUpdated,
    exports,
    providers,
  } as ModuleMetadata;
};

export const createTestingModule = (options: ModuleMetadata) => {
  const optionsUpdated = putDefaultConfigs(options);
  return Test.createTestingModule(optionsUpdated);
};
