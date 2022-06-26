import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 根据dto过滤response body无效属性
    transform: true, // 将response body转换为具体的dto实例
    forbidNonWhitelisted: true // 与whitelist属性一起使用时，如果请求有多余字段，则报错
  }));
  await app.listen(3000);
}
bootstrap();
