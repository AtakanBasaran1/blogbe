import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BlogService } from 'src/blog/blog.service';

@Module({
  providers: [PrismaService, BlogService],
  exports: [PrismaService],
})
export class PrismaModule {}