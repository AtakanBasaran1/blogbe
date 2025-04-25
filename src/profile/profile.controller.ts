import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from 'src/Dto/profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) { }

    @UseGuards(JwtAuthGuard)
    @Patch()
    updateProfile(@Req() req: any, @Body() dto: ProfileDto) {
        return this.profileService.updateProfile(req.user, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@Req() req: any) {
        return this.profileService.getProfile(req.user);
    }

    @Get('all')
    getAllProfile() {
        return this.profileService.getAllProfile()
    }


}
