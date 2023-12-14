import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCommentRequestDto } from './dto/request.dto';
import { CreateCommentResponseDto } from './dto/response.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiProperty({
    type: CreateCommentRequestDto,
  })
  @Post()
  async createComment(
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    return await this.commentsService.createComment(createCommentRequestDto);
  }

  @ApiProperty({
    type: CreateCommentRequestDto,
  })
  @Post(':commentId')
  createRecomment(
    @Param('commentId') commentId: number,
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    return this.commentsService.createRecomment(
      commentId,
      createCommentRequestDto,
    );
  }

  // POST 에 관한 댓글 조회인데 여기다가 하는거 맞겠지?
  @Get('post/:postId')
  async findAllPostComments(
    @Param('postId') postId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.commentsService.findAllPostComments(postId, page, limit);
  }

  //댓글 삭제 api
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }

  // TODO: 단일 조회 고민해보기
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }
}
