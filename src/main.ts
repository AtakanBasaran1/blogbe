// main.ts (veya app.module.ts imports kısmına)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Bunu import et
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static'; // Bunu import et

async function bootstrap() {
  // NestExpressApplication tipini kullan
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // CORS ayarlarını kontrol et (frontend'in çalıştığı adrese izin ver)
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend adresin neyse onu yazmalısın
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Statik dosya sunumu yapılandırması
  // '/uploads' URL yolunu projenin içindeki 'uploads' klasörüne eşler
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
     prefix: '/uploads/', // URL'de /uploads öneki olacak
  });

  // VEYA AppModule içinde imports'a ekleyerek:
  // ServeStaticModule.forRoot({
  //   rootPath: join(__dirname, '..', 'uploads'),
  //   serveRoot: '/uploads', // Tarayıcıdan /uploads ile erişilecek
  // })

  // Eğer /upload global prefix'in varsa (frontend kodunda kullandığın gibi)
  // app.setGlobalPrefix('upload'); // Eğer bu satır varsa, API endpointlerin /upload/profile/:userId olur.
                                // Ancak statik dosya sunumu /uploads şeklinde kalmalı.

  await app.listen(3001);
}
bootstrap();