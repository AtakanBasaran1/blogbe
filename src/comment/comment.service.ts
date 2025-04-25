import { Injectable } from '@nestjs/common';
import { CommentDto } from 'src/Dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(readonly prisma: PrismaService) { }

  // Yeni bir yorum oluşturur
  async create(createCommentDto: CommentDto) {
    const { content, blogId, userId } = createCommentDto;
    return this.prisma.comment.create({
      data: {
        content,
        blogId,
        userId,
      },
    });
  }

  // Belirli bir bloga ait tüm yorumları getirir
  async getCommentsByBlog(blogId: number) {
    return this.prisma.comment.findMany({
      where: { blogId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Tüm yorumları listeler
  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        blog: true,
        user: true,
      },
    });
  }

  // ID'ye göre tek bir yorum getirir
  async findOne(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
      include: {
        blog: true,
        user: true,
      },
    });
  }

  // ID'ye göre yorum siler
  async remove(id: number) {
    return this.prisma.comment.delete({
      where: { id },
    });
  }

  async deleteAllComment() {
    return this.prisma.comment.deleteMany();
  }
}
