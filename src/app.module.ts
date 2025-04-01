import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileController } from './profile/profile.controller';
import { BlogModule } from './blog/blog.module';

@Module({
  imports: [PrismaModule, AuthModule, BlogModule],
  controllers: [AppController, ProfileController],
  providers: [AppService],
})
export class AppModule {}
