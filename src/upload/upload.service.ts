import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import { ensureDir } from 'fs-extra'; // fs-extra kullanarak klasör varlığını kontrol et

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadProfilePicture(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new Error('Dosya yüklenmedi.');
    }

    // Dosya adını oluştur
    const fileName = `${userId}-${Date.now()}-${file.originalname}`;

    // Dosya kaydedilecek dizini kontrol et, yoksa oluştur
    const uploadDir = join(__dirname, '../../uploads');
    await ensureDir(uploadDir);

    const filePath = join(uploadDir, fileName);

    // Dosyayı kaydet
    await writeFile(filePath, file.buffer);

    // Kullanıcının profil resmini güncelle
    return this.prisma.user.update({
      where: { id: Number(userId) },
      data: { profilePicture: fileName },
    });
  }

  async getProfilePicture(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { profilePicture: true },
    });

    if (!user || !user.profilePicture) {
      throw new Error('Kullanıcı veya profil resmi bulunamadı.');
    }

    // Profil resmi için tam URL'yi döndür
    // BASE_URL'in doğru şekilde ayarlandığından emin ol
    return `${process.env.BASE_URL}/uploads/${user.profilePicture}`;
  }
}
