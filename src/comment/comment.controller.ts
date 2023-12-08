import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('api/v1/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Body() dto: CommentDto) {
    const result = this.commentService.createComment(dto);
    return result;
  }
}
