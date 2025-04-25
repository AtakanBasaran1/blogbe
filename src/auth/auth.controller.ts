import { Controller, Post, Get, Body, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/Dto/user.dto';

@Controller()
export class AuthController {
    constructor(private readonly authService : AuthService){}

    @Post('login')
    async login(@Body() dto : UserDto){
        return this.authService.login(dto)
    }
    
    @Post('register')   
    async register(@Body() dto : UserDto){
        return this.authService.register(dto.email, dto.password)
    }

    @Get('users')
    async getAllUsers(){
        return this.authService.getAllUsers();
    }

    @Patch('change-password/:id')
    async changePassword(
        @Param('id') id: number,
        @Body('oldPassword') oldPassword: string,
        @Body('newPassword') newPassword: string, 
    ) {
        const changePasswordDto = { userId: id, oldPassword, newPassword };
        return this.authService.changePassword(changePasswordDto);
    }
    
}
