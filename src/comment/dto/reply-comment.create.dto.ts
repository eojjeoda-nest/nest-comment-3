import { IsNumber } from 'class-validator';
import { CommentCreateDto } from './comment-create.dto';

export class ReplyCommentCreateDto extends CommentCreateDto {
  @IsNumber()
  readonly commentId: number;
}
