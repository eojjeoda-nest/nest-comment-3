import {
  PostCommentReportReq,
  PostCommentReportRes,
} from '../dto/comment-report.dto';
import { CommentReport } from '../entities/comment-report.entity';

export class CommentReportMapper {
  toEntity(id: number, dto: PostCommentReportReq) {
    const entity = new CommentReport();
    entity.userId = dto.userId;
    entity.commentId = id;
    return entity;
  }

  toPostCommentReportRes(status: number, message: string) {
    const dto = new PostCommentReportRes();
    dto.status = status;
    dto.message = message;
    return dto;
  }
  toTestPostCommentRepositoryReq() {
    const dto = new PostCommentReportReq();
    dto.userId = 1;
    return dto;
  }
}
