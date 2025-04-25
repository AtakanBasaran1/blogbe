import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  blogId: number;

  @IsString()
  @IsNotEmpty()
  userId: number;

}
