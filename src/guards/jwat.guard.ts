import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService:AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer')) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    const token = authHeader.split(' ')[1];

    const payload = await this.authService.validateToken(token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }

    request['user'] = payload; 
    return true;
  }
}
