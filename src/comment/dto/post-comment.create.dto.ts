import { IsNumber } from 'class-validator';
import { CommentCreateDto } from './comment-create.dto';

export class PostCommentCreateDto extends CommentCreateDto {
  @IsNumber()
  readonly postId: number;
}
