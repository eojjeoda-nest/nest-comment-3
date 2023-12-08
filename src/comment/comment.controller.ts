import { Body, Controller, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto, ResponseCommentDto } from './dto/comment.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/comment')
@ApiTags('댓글 API')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '댓글 생성 API' })
  @ApiCreatedResponse({
    description: '댓글을 작성한다.',
    type: ResponseCommentDto,
  })
  createComment(@Body() dto: CommentDto) {
    const result = this.commentService.createComment(dto);
    return result;
  }
}
