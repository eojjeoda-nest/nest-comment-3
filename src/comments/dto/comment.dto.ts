import { ApiProperty, IntersectionType, PickType } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';
import { PostDto } from 'src/posts/dto/user.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { COMMENT_VALIDATION_CONSTANTS } from '../constants';

export class CommentDto extends IntersectionType(
  PickType(UserDto, ['userId']),
  PickType(PostDto, ['primaryPostId']),
) {
  @ApiProperty({
    example: 1,
    description: '댓글 ID',
  })
  commentId: number;

  @ApiProperty({
    example: '댓글 내용',
    description: '댓글 내용',
    required: true,
  })
  @MinLength(COMMENT_VALIDATION_CONSTANTS.COMMENT_MIN_LENGTH)
  @MaxLength(COMMENT_VALIDATION_CONSTANTS.COMMENT_MAX_LENGTH)
  content: string;

  @ApiProperty({
    example: false,
    description: '댓글 숨김 여부',
  })
  isHide: boolean;
}
