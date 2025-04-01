import {IsNotEmpty, IsString, IsEmail, MinLength} from 'class-validator';

export class UserDto {
    @IsEmail({}, {message: 'Geçersiz email adresi'})
    email: string;

    @IsString({message: 'Şifre string olmalıdır'})
    @IsNotEmpty({message: 'Şifre boş olamaz'})
    @MinLength(6)
    password: string;
}