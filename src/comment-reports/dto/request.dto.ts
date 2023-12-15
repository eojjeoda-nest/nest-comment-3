import { IntersectionType, PickType } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { CommentReportDto } from './comment-report.dto';

export class CreateCommentReportRequestDto extends IntersectionType(
  PickType(UserDto, ['userId']),
  PickType(CommentReportDto, ['reportReason']),
) {}
