import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ValidationExceptionFactory } from './common/validation-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // TODO: add custom validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => ValidationExceptionFactory.create(errors),
      stopAtFirstError: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
