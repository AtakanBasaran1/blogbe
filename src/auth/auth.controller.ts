import { Controller, Post, Get, Body } from '@nestjs/common';
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
    
}
