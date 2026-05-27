import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe(
    {
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }, whitelist: true,
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Matricula NYU')
    .setDescription('Sistema de Matrícula y Gestión Académica NYU')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();