import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(20)
  @ApiProperty({ description: 'writer' })
  writer: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  @ApiProperty({ description: 'content' })
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'postId' })
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'userId' })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'parentId' })
  parentId: number;
}

class AddCreatedAt {
  createdAt: Date;
}

export class PostCommentReq extends OmitType(CommentDto, [
  'id',
  'parentId',
] as const) {}

export class PostCommentRes extends IntersectionType(
  CommentDto,
  AddCreatedAt,
) {}

export class ResponseCommentDto {
  @ApiProperty({ description: 'id' })
  id: number;

  @ApiProperty({ description: 'content' })
  content: string;

  @ApiProperty({ description: 'writer' })
  writer: string;

  @ApiProperty({ description: 'commentId' })
  commentId: number;

  @ApiProperty({ description: 'postId' })
  postId: number;

  @ApiProperty({ description: 'userId' })
  userId: number;

  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;
}
