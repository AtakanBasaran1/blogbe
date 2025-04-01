import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
@UseGuards(JwtAuthGuard)
@Get()
    getProfile() {
        return { message: 'Senin profilin' };
    } 

}
