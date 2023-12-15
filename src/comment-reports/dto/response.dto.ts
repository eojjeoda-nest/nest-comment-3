import { IntersectionType, PickType } from '@nestjs/swagger';
import { CommentReportEntity } from '../entities/comment-report.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';

export class CreateCommentReportResponseDto extends IntersectionType(
  PickType(UserEntity, ['userId']),
  PickType(CommentEntity, ['primaryCommentId']),
  PickType(CommentReportEntity, ['isReport', 'reportReason']),
) {}
