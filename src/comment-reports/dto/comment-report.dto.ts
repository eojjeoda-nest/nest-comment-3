import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { CommentDto } from 'src/comments/dto/comment.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CommentReportDto extends IntersectionType(
  PickType(UserDto, ['userId']),
  PickType(CommentDto, ['commentId']),
) {
  primaryCommentReportId: number;

  @ApiProperty({
    example: false,
    description: '댓글 신고 여부',
  })
  isReport: boolean;

  @ApiProperty({
    example: '욕설이 너무 많아요!',
    description: '댓글 신고 사유',
  })
  reportReason: string;
}
