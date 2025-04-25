import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class UserDto {
    @IsEmail({}, { message: 'Geçersiz email adresi' })
    email: string;

    @IsString({ message: 'Şifre string olmalıdır' })
    @IsNotEmpty({ message: 'Şifre boş olamaz' })
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsString()
    age?: string;

    @IsOptional()
    @IsString()
    website?: string;

}