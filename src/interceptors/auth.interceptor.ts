import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

const IGNORE_AUTH_ROUTES = [
  '/auth/refresh',
  '/auth/signup',
  '/auth/login',
  '/doc',
  '/',
];

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  private jwtTokenService: JwtService;

  constructor() {
    this.jwtTokenService = new JwtService();
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const authHeaderValue = context.switchToHttp().getRequest().headers[
      'authorization'
    ];
    const path = context.switchToHttp().getRequest().path;

    const pathRequireAuth = IGNORE_AUTH_ROUTES.indexOf(path) === -1;
    const invalidToken =
      authHeaderValue === undefined || !this.isTokenValid(authHeaderValue);

    if (pathRequireAuth && invalidToken) {
      throw new HttpException(
        'Access token is invalid or expired',
        HttpStatus.FORBIDDEN,
      );
    }

    return next.handle().pipe();
  }

  private isTokenValid(authHeaderValue: string): boolean {
    try {
      const token = authHeaderValue.replace('Bearer ', '');
      const { exp } = this.jwtTokenService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (exp < +Date.now()) {
        return false;
      }
    } catch {
      return false;
    }

    return true;
  }
}
