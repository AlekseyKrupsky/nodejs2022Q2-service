import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { cwd } from 'node:process';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

const DEFAULT_PORT_NUMBER = 4000;

async function bootstrap() {
  dotenv.config({ path: `${cwd()}/.env` });

  const app = await NestFactory.create(AppModule);

  const swaggerBuffer = await readFile(`${cwd()}/doc/api.yaml`);
  const swaggerDocument = parse(swaggerBuffer.toString());

  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe());

  const serverPort = process.env.PORT ?? DEFAULT_PORT_NUMBER;

  await app.listen(serverPort);
}

bootstrap();
