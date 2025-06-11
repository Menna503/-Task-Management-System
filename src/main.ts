
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common'; // استيراد ValidationPipe
// import { LoggerMiddleware } from './middelWare/loginMiddelWare';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//    app.use(new LoggerMiddleware().use);
//   app.useGlobalPipes(new ValidationPipe());

//   await app.listen(process.env.PORT ?? 3000);
// }

// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // استيراد ValidationPipe
import { LoggerMiddleware } from './middelWare/loginMiddelWare'; // استيراد الـ middleware

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
    // app.use(new LoggerMiddleware().use);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
