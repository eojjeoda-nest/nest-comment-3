import { IntersectionType, PickType } from '@nestjs/swagger';
import { CommentDto } from 'src/comments/dto/comment.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { CommentReportDto } from './comment-report.dto';

export class CreateCommentReportResponseDto extends IntersectionType(
  PickType(UserDto, ['userId']),
  PickType(CommentDto, ['primaryCommentId']),
  PickType(CommentReportDto, ['isReport', 'reportReason']),
) {}
