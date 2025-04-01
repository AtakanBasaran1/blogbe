import { Controller, Get, Post, Body, Request, UseGuards, Delete } from '@nestjs/common';
import { BlogService } from './blog.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BlogDto } from 'src/Dto/blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createBlogDto: BlogDto) {
    console.log('Req.user:', req.user); // Req.user bilgisini kontrol et
    return this.blogService.create(req.user, createBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log('Req.user:', req.user); // Req.user bilgisini kontrol et
    return this.blogService.findAll(req.user);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteAllBlogs(@Request() req) {
    console.log('Req.user:', req.user); // Req.user bilgisini kontrol et
    return this.blogService.deleteAllBlogs(req.user);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteBlogById(@Request() req, @Body('id') blogId: number) {
    console.log('Req.user:', req.user); // Req.user bilgisini kontrol et
    return this.blogService.deleteBlogById(req.user, blogId);
  }

  @Get('all')
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }
}
