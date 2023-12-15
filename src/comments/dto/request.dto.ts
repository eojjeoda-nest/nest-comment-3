import { OmitType } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CreateCommentRequestDto extends OmitType(CommentDto, [
  'primaryCommentId',
  'isHide',
  'likeCount',
  'reportCount',
]) {}
