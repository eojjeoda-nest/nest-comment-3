import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({ description: 'content' })
  content: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({ description: 'writer' })
  writer: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'postId' })
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'userId' })
  userId: number;
}

export class ResponseCommentDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'content' })
  content: string;

  @ApiProperty({ description: 'writer' })
  writer: string;

  @ApiProperty({ description: 'postId' })
  postId: number;

  @ApiProperty({ description: 'userId' })
  userId: number;

  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;
}
