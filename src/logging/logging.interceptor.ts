import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import {LoggingService} from "./logging.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private loggingService: LoggingService;

    constructor() {
        this.loggingService = new LoggingService();
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                this.loggingService.log(JSON.stringify(data));

                return data;
            }),
        );
    }
}
