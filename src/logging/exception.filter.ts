import {
  Catch,
  ExceptionFilter,
  HttpStatus,
  ArgumentsHost,
} from '@nestjs/common';
import { LoggingService } from './logging.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private loggingService: LoggingService;

  constructor() {
    this.loggingService = LoggingService.getInstance();
  }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    if (typeof exception.getStatus === 'function') {
      status = exception.getStatus();
    }

    if (status === HttpStatus.BAD_REQUEST) {
      status = HttpStatus.UNAUTHORIZED;
    }

    const query = JSON.stringify(request.query);
    const body = JSON.stringify(request.body);

    const logMessage = `Request: path: ${request.path}, query: ${query}, body: ${body}; Response message: ${exception.message}, status: ${status}`;

    this.loggingService.error(logMessage);

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
