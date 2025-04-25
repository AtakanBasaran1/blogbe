import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { AuthService } from './auth.service';

@Injectable() 
export class JwtStrategy extends PassportStrategy(Strategy) { // Passport stratejisinden türemiş bir JwtStrategy sınıfı oluşturuyoruz
  constructor(private authService: AuthService) { // AuthService'i sınıfa enjeksiyon yapıyoruz, kimlik doğrulama işlemleri için kullanılacak
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // JWT token'ını HTTP başlığından, Bearer token olarak çıkarır
      secretOrKey: 'secretKey', // JWT token'ını doğrulamak için kullanılan gizli anahtar, genellikle ortam değişkeninde saklanır
    });
  }

  // validate metodu, JWT doğrulandıktan sonra çağrılır ve doğrulama bilgilerini kullanarak kullanıcı verisini döner
  async validate(payload: JwtPayload) {
    return { sub : payload.sub, email: payload.email }; // JWT payload'ından gelen bilgileri kullanarak kullanıcıyı doğrular, burada 'sub' kullanıcı id'si ve 'email' kullanıcının e-posta adresidir
  }
}