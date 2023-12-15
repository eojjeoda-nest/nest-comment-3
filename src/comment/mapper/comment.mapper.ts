import {
  DeleteCommentRes,
  PostCommentPageRes,
  PostCommentReq,
  PostCommentRes,
} from '../dto/comment.dto';
import { Comment } from '../entities/comment.entity';
import { PageDto } from '../../global/dto/page.dto';

export class CommentMapper {
  toEntity(dto: PostCommentReq, id: number) {
    const comment = new Comment();
    comment.writer = dto.writer;
    comment.content = dto.content;
    comment.postId = dto.postId;
    comment.userId = dto.userId;
    comment.parentId = id;
    return comment;
  }

  toPostCommentRes(entity: Comment, likeCount: number) {
    const dto = new PostCommentRes();
    dto.id = entity.id;
    dto.writer = entity.writer;
    dto.content = entity.content;
    dto.postId = entity.postId;
    dto.userId = entity.userId;
    dto.parentId = entity.parentId;
    dto.createdAt = entity.createdAt;
    dto.recomments = entity.recomments;
    dto.likeCount = likeCount;
    return dto;
  }

  toPostCommentPageRes(comments: Comment[], meta: PageDto) {
    const dto = new PostCommentPageRes();
    const postCommentRes: PostCommentRes[] = comments.map((comment) => {
      return this.toPostCommentRes(comment, comment.like.length);
    });

    dto.data = postCommentRes;
    dto.meta = meta;
    return dto;
  }

  toDeleteCommentRes(status: number, message: string) {
    const dto = new DeleteCommentRes();
    dto.status = status;
    dto.message = message;
    return dto;
  }
}
