import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 根据dto过滤response body无效属性
    transform: true, // 将response body转换为具体的dto实例
    forbidNonWhitelisted: true, // 与whitelist属性一起使用时，如果请求有多余字段，则报错
    transformOptions:{
      enableImplicitConversion: true //自动隐式转换
    }
  }));
  app.useGlobalFilters(new HttpExceptionFilter()) // 全局范围内使用ExceptionFilter
  // app.useGlobalGuards(new ApiKeyGuard()); // 全局范围内使用Guard

  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor());

  await app.listen(3000);
}
bootstrap();
