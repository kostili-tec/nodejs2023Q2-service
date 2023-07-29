import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import * as YAML from 'js-yaml';
import * as fs from 'fs/promises';
import * as path from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const envFileName =
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env';
  dotenv.config({ path: envFileName });

  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const apiDocs = await fs.readFile(path.resolve('./doc/api.yaml'), 'utf-8');
  const swaggerDocument: OpenAPIObject = YAML.load(apiDocs) as OpenAPIObject;

  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(PORT, () =>
    console.log(`Server started on port = ${PORT} `),
  );
}
bootstrap();
