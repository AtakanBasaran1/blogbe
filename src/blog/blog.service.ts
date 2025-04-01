import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogDto } from 'src/Dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async create(user: any, createBlogDto: BlogDto) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı bilgisi geçerli değil!');
    }

    return this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        content: createBlogDto.content,
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları oluştur
      },
    });
  }
  
  async getAllBlogs() {
    return this.prisma.blog.findMany();
  }

  async findAll(user: any) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }
  
    return this.prisma.blog.findMany({
      where: {
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları listele
      },
    });
  }

  async deleteAllBlogs(user: any) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }
  
    return this.prisma.blog.deleteMany({
      where: {
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları sil
      },
    });
  }

  async deleteBlogById(user: any, blogId: number) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }
  
    return this.prisma.blog.delete({
      where: {
        id: blogId,
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları sil
      },
    });
  }
}
