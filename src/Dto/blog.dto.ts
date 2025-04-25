import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class BlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsOptional()
  category? : string;

  @IsString()
  @IsOptional()
  tag? : string;

  @IsString()
  @IsOptional()
  comments? : string;

  @IsString()
  @IsOptional()
  authorId?: number; 
}
