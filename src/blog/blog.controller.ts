import { Controller, Get, Post, Body, Request, UseGuards, Delete, Param, Req } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogDto } from 'src/Dto/blog.dto';
import { CommentDto } from 'src/Dto/comment.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createBlogDto: BlogDto) {
    console.log('Req.user:', req.user);
    return this.blogService.createBlog(req.user, createBlogDto);
  }

  // TÜM BLOGLARI LİSTELE
  @Get('all')
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  // USER A AİT TÜM BLOGLARLI LİSTELE
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('Req.user:', req.user);
    return this.blogService.findAll(req.user);
  }


  // ID YE ÖZEL BLOGU LİSTELE
  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(parseInt(id));
  }

  // USER A AİT TÜM BLOGLARI SİL
  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAllBlogs(@Request() req) {
    console.log('Req.user:', req.user);
    return this.blogService.deleteAllBlogs(req.user);
  }

  // USER A AİT, ID YE GÖRE OLAN ÖZEL BLOGU SİL
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBlogById(@Param('id') id: number, @Req() req: any) {
    return this.blogService.deleteBlogById(Number(id), req.user);
  }


}
