import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap, map } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    // return next.handle().pipe(tap(data => console.log('After...', data)));
    // data包装器
    return next.handle().pipe(map(data => ({data})));  

  }
}
