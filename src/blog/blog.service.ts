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
    return this.prisma.blog.findMany({
      include : {
        author : {
          select : {
            email : true,
            name : true, // yazarın email ve adını dahil et
          }
        }
      }
    });
  }

  async findAll(user: any) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }
  
    return this.prisma.blog.findMany({
      where: {
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları listele
      }, 
      include : {
        author : {
          select : {
            email : true,
            name : true, // yazarın email ve adını dahil et
          }
        }
      }
    });
  }

  
  async findBlogById(blodId : number){
    return this.prisma.blog.findUnique({
      where : {
        id : blodId,
      },
      include : {
        author : {
          select : {
            email : true,
            name : true,
          }
        }
      }
    })
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

  async deleteAllBlogById(user: any, blogId: number) {
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

async deleteBlog(user: any, blogId: number) {
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
