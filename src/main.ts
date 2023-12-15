import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  // TODO: 프로그램 구현
  
  const swaggerConfig = new DocumentBuilder()
  .setTitle('댓글 API')
  .setDescription('댓글과제')
  .setVersion('1.0')
  .build()

  const swagger = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swagger);
  
  await app.listen(process.env.PORT || 8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
