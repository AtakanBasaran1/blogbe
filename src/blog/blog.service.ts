import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BlogDto } from 'src/Dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) { }

  async createBlog(user: any, createBlogDto: BlogDto) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı bilgisi geçerli değil!');
    }

    return this.prisma.blog.create({
      data: {
        title: createBlogDto.title,
        content: createBlogDto.content,
        category: createBlogDto.category,
        tag: createBlogDto.tag,
        authorId: user.sub,  // sadece kullanıcının idsine özel blogları oluştur
      },
    });
  }

  // tüm blogları listele
  async getAllBlogs() {
    return this.prisma.blog.findMany({
      include: {
        author: {
          select: {
            email: true,
            name: true,
          }
        },
        comments: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        }
      }
    });
  }

  // user a ait tüm blogları listele
  async findAll(user: any) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }

    return this.prisma.blog.findMany({
      where: {
        authorId: user.sub,
      },
      include: {
        author: {
          select: {
            email: true,
            name: true,
          }
        },
        comments: {
          include: {
            user: {
              select: {
                email: true,
                name: true
              }
            }
          }
        }
      }
    });
  }


  // user a, id ye özel blogu listele
  async getBlogById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: {
        author: {
          include: {
            profile: true
          }
        },
        comments: {
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        }
      }
    });

    if (!blog) {
      throw new NotFoundException('Blog bulunamadı');
    }

    return blog;
  }


  // tüm blogları sil
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

  // o user a, id ye ait blogu sil
  async deleteBlogById(blogId: number, user: any) {
    if (!user || !user.sub) {
      throw new Error('Kullanıcı ID si doğrulanamadı!');
    }

    // Blogun mevcut olup olmadığını kontrol et
    const blog = await this.prisma.blog.findUnique({
      where: { id: blogId },
    });

    if (!blog) {
      throw new Error('Blog bulunamadı!');
    }

    // Blogun sahibinin kullanıcıyla eşleşip eşleşmediğini kontrol et
    if (blog.authorId !== user.sub) {
      throw new Error('Bu blogu silme yetkiniz yok!');
    }

    // Blogu sil
    return this.prisma.blog.delete({
      where: { id: blogId },
    });
  }


}
