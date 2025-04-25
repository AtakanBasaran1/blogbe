import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/Dto/user.dto';
import { ChangePasswordDto } from 'src/Dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) { }

  // Kullanıcı Doğrulama İşlemi +++++++

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } }) // email ile user'ı db'den sorguladık
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    } // user varsa eğer user'ın girdiği şifre ile db'deki şifreleri karşılaştır ve user'ı döndür
    return null; // hatalıysa null döndür
  }

  // Login İşlemi +++++++

  async login(userDto: UserDto) {
    // Veritabanında e-posta ile kullanıcıyı bul
    const user = await this.prisma.user.findUnique({
      where: { email: userDto.email }, // Girilen e-posta veritabanında var mı kontrol et
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı!'); // Eğer kullanıcı bulunamazsa hata fırlat
    }

    // Şifrenin doğruluğunu kontrol et (isteğe bağlı, ancak güvenlik için gerekli)
    const isPasswordValid = await bcrypt.compare(userDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Geçersiz şifre!'); // Eğer şifre geçerli değilse hata fırlat
    }

    // Kullanıcıyı doğruladıktan sonra token üret
    const payload = { email: user.email, sub: user.id }; // Kullanıcı e-posta ve id bilgilerini payload'a ekle
    const token = this.jwtService.sign(payload); // Payload'ı JWT token'a dönüştür

    // Token ve kullanıcı bilgilerini döndür
    return {
      token,     // JWT token
      userId: user.id, // Kullanıcının ID'si
      email: user.email, // Kullanıcının e-posta adresi
    };
  }

  // Yeni kullanıcı kaydetme işlemi +++++++

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); // şifreyi güvenli şekilde hashle
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword, // hashlenmiş şifre ile kullanıcı oluştur
      },
    });
    return newUser; // yeni oluşturulan user'ı döndür
  }








  // Tüm kullanıcıları getirme işlemi +++++++
  async getAllUsers() {
    return this.prisma.user.findMany(); // db'den tüm kullanıcıları getir
  }


  // Şifre güncelleme işlemi +++++++

  async changePassword(dto: ChangePasswordDto) {
    const { userId, oldPassword, newPassword } = dto;
    const user = await this.prisma.user.findUnique({ where: { id: Number(userId) } }); // db de böyle bir user var mı kontrol et
    if (!user) {
      throw new Error('Kullanıcı bulunamadı!');
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password); // eski şifreyi db'deki şifre ile karşılaştır
    if (!isOldPasswordValid) {
      throw new Error('Eski şifre yanlış!');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // yeni şifreyi hashle
    await this.prisma.user.update({ // db'deki şifreyi güncelle
      where: { id: Number(userId) },
      data: { password: hashedPassword }
    });
    return { message: 'Şifre başarıyla değiştirildi!' }
  }


}
