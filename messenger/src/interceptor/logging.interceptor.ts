import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(`Intercept: ${req.path}`);
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Intercept take: ${Date.now() - now}ms`)));
  }
}
