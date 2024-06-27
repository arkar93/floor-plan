import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ValidationExceptionFactory } from './common/validation-exception';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Floor Plan')
    .setDescription('The floor plan API description')
    .setVersion('1.0')
    .addTag('floor-plan')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => ValidationExceptionFactory.create(errors),
      stopAtFirstError: true,
    }),
  );
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
