import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
// import { ProfileController } from './profile/profile.controller';
import { BlogModule } from './blog/blog.module';
// import { UploadService } from './upload/upload.service';
// import { UploadController } from './upload/upload.controller';
import { UploadModule } from './upload/upload.module';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
// import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, AuthModule, BlogModule, UploadModule, CommentModule, ProfileModule],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule { }
