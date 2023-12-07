import { Controller, Post, Body } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostRequestDto } from './dto/request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostResponseDto } from './dto/response.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiProperty({
    type: CreatePostRequestDto,
  })
  @Post()
  create(
    @Body() createPostRequestDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    return this.postsService.create(createPostRequestDto);
  }
}
