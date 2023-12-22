import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { PostCommentReq, PostCommentRes } from './dto/comment.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostCommentLikeReq, PostCommentLikeRes } from './dto/comment-like.dto';
import {
  PostCommentReportReq,
  PostCommentReportRes,
} from './dto/comment-report.dto';

@Controller('api/v1/comment')
@ApiTags('댓글 API')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 생성 API' })
  @ApiCreatedResponse({
    description: '댓글을 작성한다.',
    type: PostCommentRes,
  })
  createComment(@Body() dto: PostCommentReq) {
    const result = this.commentService.createComment(dto);
    return result;
  }

  @Post(':commentId')
  @ApiOperation({ summary: '대댓글 생성 API' })
  @ApiCreatedResponse({
    description: '대댓글을 작성한다.',
    type: PostCommentRes,
  })
  createRecomment(@Param('commentId') id: number, @Body() dto: PostCommentReq) {
    const result = this.commentService.createRecomment(id, dto);
    return result;
  }
  @Delete(':commentId')
  @ApiOperation({ summary: '댓글/대댓글 삭제 API' })
  @ApiCreatedResponse({
    description: '댓글/대댓글을 삭제한다.',
  })
  deleteComment(@Param('commentId') id: number) {
    return this.commentService.deleteComment(id);
  }

  @Post('likes/:commentId')
  @ApiOperation({ summary: '댓글 좋아요 API' })
  @ApiCreatedResponse({
    description: '댓글에 좋아요를 작성한다.',
    type: PostCommentLikeRes,
  })
  createCommentLike(
    @Param('commentId') id: number,
    @Body() dto: PostCommentLikeReq,
  ) {
    return this.commentService.createCommentLike(id, dto);
  }

  @Post('reports/:commentId')
  @ApiOperation({ summary: '댓글 신고 API' })
  @ApiCreatedResponse({
    description: '댓글을 신고한다.',
    type: PostCommentReportRes,
  })
  createCommentReport(
    @Param('commentId') id: number,
    @Body() dto: PostCommentReportReq,
  ) {
    return this.commentService.createCommentReport(id, dto);
  }
}
