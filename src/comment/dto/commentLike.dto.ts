import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentLikeDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'userId' })
  userId: number;
}

export class PostCommentLikeReq extends IntersectionType(CommentLikeDto) {}
export class PostCommentLikeRes {
  @ApiProperty({ description: 'status' })
  status: number;

  @ApiProperty({ description: 'message' })
  message: string;
}
