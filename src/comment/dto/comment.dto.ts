import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { PageDto } from '../../global/dto/page.dto';
import { Comment } from '../entities/comment.entity';

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

class AddRecomments {
  recomments: Comment[];
}

export class PostCommentReq extends OmitType(CommentDto, [
  'id',
  'parentId',
] as const) {}

export class PostCommentRes extends IntersectionType(
  CommentDto,
  AddRecomments,
  AddCreatedAt,
) {}

export class PostCommentPageRes {
  @ApiProperty({ description: 'data' })
  data: PostCommentRes[];
  @ApiProperty({ description: 'meta' })
  meta: PageDto;
}
