import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CommentCreateDto } from '../dto/comment-create.dto';
import { PostCommentCreateDto } from '../dto/post-comment.create.dto';

@Controller('/api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() commentCreateDto: PostCommentCreateDto) {
    await this.commentService.create(commentCreateDto);
    return;
  }
}
