import { IsOptional, IsString } from 'class-validator';

export class ProfileDto {

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
