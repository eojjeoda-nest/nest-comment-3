import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { CommentDto } from 'src/comments/dto/comment.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CommentLikeDto extends IntersectionType(
  PickType(UserDto, ['userId']),
  PickType(CommentDto, ['primaryCommentId']),
) {
  primaryCommentLikeId: number;

  @ApiProperty({
    example: false,
    description: '댓글 좋아요 여부',
  })
  isLike: boolean;
}
