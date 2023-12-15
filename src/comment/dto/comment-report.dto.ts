import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentReportDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'userId' })
  userId: number;
}

export class PostCommentReportReq extends IntersectionType(CommentReportDto) {}
export class PostCommentReportRes {
  @ApiProperty({ description: 'status' })
  status: number;

  @ApiProperty({ description: 'message' })
  message: string;
}
