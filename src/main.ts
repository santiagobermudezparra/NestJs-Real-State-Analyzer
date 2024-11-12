import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Real Estate Investment Analyzer')
    .setDescription('API for analyzing real estate investments')
    .setVersion('1.0')
    .build();

    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
