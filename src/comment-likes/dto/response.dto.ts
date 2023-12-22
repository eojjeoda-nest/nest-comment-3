import { PickType } from '@nestjs/swagger';
import { CommentLikeDto } from './comment-like.dto';

export class CreateCommentLikeResponseDto extends PickType(CommentLikeDto, [
  'primaryCommentId',
  'isLike',
]) {}
