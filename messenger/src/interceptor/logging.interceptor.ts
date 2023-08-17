import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log(`Intercept: ${req.path}`);
    const now = Date.now();
    return next.handle().pipe(
      tap(() => console.log(`Intercept take: ${Date.now() - now}ms`)),
      catchError((error) => {
        console.log(`Error occur, Intercept take: ${Date.now() - now}ms`);
        // return throwError(error);
        return throwError(() => error);
      }),
    );
  }
}
