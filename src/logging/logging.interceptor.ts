import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private loggingService: LoggingService;

  constructor() {
    this.loggingService = LoggingService.getInstance();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;
    const body = JSON.stringify(request.body);
    const query = JSON.stringify(request.query);

    const requestLogMessage = `Request: path: ${path}, query: ${query}, body: ${body}`;

    return next.handle().pipe(
      map((data) => {
        this.loggingService.log(
          `${requestLogMessage}; Response: ${JSON.stringify(data)}`,
        );

        return data;
      }),
    );
  }
}
