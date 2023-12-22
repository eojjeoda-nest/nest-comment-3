import {
  PostCommentLikeReq,
  PostCommentLikeRes,
} from '../dto/comment-like.dto';
import { CommentLike } from '../entities/comment-like.entity';

export class CommentLikeMapper {
  toEntity(id: number, dto: PostCommentLikeReq) {
    const entity = new CommentLike();
    entity.userId = dto.userId;
    entity.commentId = id;
    return entity;
  }

  toPostCommentLikeRes(status: number, message: string) {
    const dto = new PostCommentLikeRes();
    dto.status = status;
    dto.message = message;
    return dto;
  }
  toTestPostCommentLikeReq() {
    const dto = new PostCommentLikeReq();
    dto.userId = 1;
    return dto;
  }
}
