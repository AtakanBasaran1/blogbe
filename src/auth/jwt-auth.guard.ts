// src/auth/jwt-auth.guard.ts

import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Yetkilendirme hatası! JWT token eksik.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token);
      (request as any).user = decoded;  // Kullanıcı bilgilerini 'request' içine yerleştiriyoruz
      return true;
    } catch (err) {
      throw new UnauthorizedException('Geçersiz veya süresi dolmuş token!');
    }
  }
}
