import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Response} from 'express'

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 可以访问到原始request和response对象
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error = typeof response === 'string'
     ? {message: exceptionResponse} 
     : (exceptionResponse as object)
    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    })
     
  }   
}
