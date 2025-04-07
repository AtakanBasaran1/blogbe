import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { BlogModule } from './blog/blog.module';
import { UploadService } from './upload/upload.service';
import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PrismaModule, AuthModule, BlogModule, UploadModule],
  controllers: [AppController, ProfileController, UploadController],
  providers: [AppService, UploadService],
})
export class AppModule {}
