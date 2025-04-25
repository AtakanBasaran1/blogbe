import { Controller, Post, Get, Delete, Patch, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CommentDto } from 'src/Dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  // Yeni bir yorum oluşturur
  @Post()
  create(@Body() createCommentDto: CommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // Tüm yorumları listeler
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  // ID'ye göre tek bir yorum getirir
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  // Belirli bir bloga ait tüm yorumları getirir
  @Get('blog/:id')
  getCommentsByBlog(@Param('id') id: string) {
    return this.commentService.getCommentsByBlog(+id);
  }

  // ID'ye göre yorum siler
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Delete()
  removeAllComment() {
    return this.commentService.deleteAllComment();
  }
}
