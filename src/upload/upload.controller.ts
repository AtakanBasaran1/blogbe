import { Controller, Post, UploadedFile, UseInterceptors, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('profile/:userId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfile(
    @Param('userId') userId: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.uploadService.uploadProfilePicture(userId, file);
  }

  @Get('profile/:userId')
  async getProfile(@Param('userId') userId: string) {
    return this.uploadService.getProfilePicture(userId);
  }
  
}
