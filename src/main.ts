import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { cwd } from 'node:process';

async function bootstrap() {
  const DEFAULT_PORT_NUMBER = 4000;

  dotenv.config({ path: `${cwd()}/.env` });

  const serverPort = process.env.PORT ?? DEFAULT_PORT_NUMBER;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(serverPort);
}

bootstrap();
