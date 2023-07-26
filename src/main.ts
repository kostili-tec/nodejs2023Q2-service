import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const envFileName =
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env';
  dotenv.config({ path: envFileName });

  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () =>
    console.log(`Server started on port = ${PORT} `),
  );
}
bootstrap();
