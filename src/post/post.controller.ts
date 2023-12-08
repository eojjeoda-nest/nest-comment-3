import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/v1/post')
@ApiTags('게시물 API')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':postId/commnets')
  @ApiOperation({ summary: '게시글 별 댓글 조회 API' })
  @ApiCreatedResponse({
    description: '해당 게시글에 달린 댓글들을 조회한다.',
    // type: ResponseCommentDto,
  })
  findCommentsByPostId(@Param('postId') id: number) {
    const result = this.postService.findCommentsByPostId(id);
    return result;
  }
}
