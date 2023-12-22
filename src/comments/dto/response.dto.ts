import { OmitType } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';

export class CreateCommentResponseDto extends OmitType(CommentDto, [
  'reportCount',
]) {}
