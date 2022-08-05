import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (status === HttpStatus.BAD_REQUEST) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: exception.message,
      });
    }
  }
}
