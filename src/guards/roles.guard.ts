
import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

 canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
  console.log(' Required Roles:', requiredRoles);

  const request = context.switchToHttp().getRequest();
  const user = request.user;
  console.log(' User in request:', user);

  if (!requiredRoles) {
    return true;
  }

  if (!user || !requiredRoles.includes(user.role)) {
    console.log(' Access denied: user role is', user?.role);
    throw new ForbiddenException('You do not have permission');
  }

  
  return true;
}

}
