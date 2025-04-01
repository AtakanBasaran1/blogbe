import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserDto } from 'src/Dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma : PrismaService,
        private readonly jwtService : JwtService,
     ){}

     // Kullanıcı Doğrulama İşlemi---------
     async validateUser(email : string, password : string){
        const user = await this.prisma.user.findUnique({where : {email}}) // email ile user'ı db'den sorguladık
        if(user && await bcrypt.compare(password , user.password)  ){
         return user;
        } // user varsa eğer user'ın girdiği şifre ile db'deki şifreleri karşılaştır ve user'ı döndür
        return null; // hatalıysa null döndür
     }

     // Kullanıcı Girişi ve JWT Token Üretme İşlemi-------
     async login(userDto: UserDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: userDto.email }, // girilen email db de eşleşiyor mu kontrol et
      });
  
      if (!user) {
        throw new Error('Kullanıcı bulunamadı!'); // yanlış emailse, kullanıcı bulunamazsa hata fırlat
      }
  
      // Burada 'sub' kısmına kullanıcının ID'si ekleniyor
      const payload = { email: user.email, sub: user.id };  // userı bilgileri payload' a aktarılıyor
      const token = this.jwtService.sign(payload);  // payload token'a dönüştürülüyor
      return { token };  // token döndürülüyor
    }
  

     // Yeni kullanıcı kaydetme işlemi
     async register(email : string, password : string){
      const hashedPassword = await bcrypt.hash(password, 10); // şifreyi güvenli şekilde hashle
      const newUser = await this.prisma.user.create({
         data : {
            email,
            password : hashedPassword, // hashlenmiş şifre ile kullanıcı oluştur
         },
      });
      return newUser; // yeni oluşturulan user'ı döndür
     }

       // Tüm kullanıcıları getirme işlemi
      async getAllUsers(){
         return this.prisma.user.findMany(); // db'den tüm kullanıcıları getir
       }

}
