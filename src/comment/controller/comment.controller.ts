import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentCreateDto } from '../dto/comment-create.dto';
import { PostCommentCreateDto } from '../dto/post-comment.create.dto';
import { ReplyCommentCreateDto } from '../dto/reply-comment.create.dto';

@Controller('/api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 대댓글 작성 api
  @Post('/reply')
  async createReply(@Body() commentCreateDto: ReplyCommentCreateDto) {
    await this.commentService.createReply(commentCreateDto);
    return;
  }

  // 댓글 작성 api
  @Post()
  async create(@Body() commentCreateDto: PostCommentCreateDto) {
    await this.commentService.create(commentCreateDto);
    89;
    return;
  }
}
