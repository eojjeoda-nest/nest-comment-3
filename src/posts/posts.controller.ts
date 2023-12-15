import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDto } from './dto/request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreatePostResponseDto } from './dto/response.dto';

@ApiTags('게시글 관련 API')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: '게시글 생성 API',
    description: '게시글 생성',
  })
  @ApiOkResponse({
    description: '게시글 생성 성공',
    type: CreatePostResponseDto,
  })
  @Post()
  create(
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return this.postsService.create(createPostRequestDto);
  }
}
