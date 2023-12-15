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
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentRequestDto } from './dto/request.dto';
import { CreateCommentResponseDto } from './dto/response.dto';

@ApiTags('댓글/대댓글 관련 API')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '댓글 생성 API',
    description: '댓글 생성',
  })
  @ApiOkResponse({
    description: '댓글 생성 성공',
    type: CreateCommentResponseDto,
  })
  @Post()
  async createComment(
    @Body() createCommentRequestDto: CreateCommentRequestDto,
  ) {
    return await this.commentsService.createComment(createCommentRequestDto);
  }

  @ApiOperation({
    summary: '대댓글 생성 API',
    description: '대댓글 생성',
  })
  @ApiParam({
    name: 'commentId',
    description: '대댓글 번호',
    required: true,
  })
  @ApiOkResponse({
    description: '대댓글 생성 성공',
    type: CreateCommentResponseDto,
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
  @ApiOperation({
    summary: '게시글에 관한 댓글 조회 API',
    description: '게시글에 관한 댓글/대댓글 조회 (페이징)',
  })
  @ApiParam({
    name: 'postId',
    description: '게시글 번호',
    required: true,
  })
  @ApiQuery({
    name: 'page',
    description: '페이지 번호',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: '페이지당 게시글 수',
    required: true,
  })
  @ApiOkResponse({
    description: '게시글에 관한 댓글 조회 성공',
    type: CreateCommentResponseDto, // TODO: 페이징 처리 반환 DTO 만들기
  })
  @Get('post/:postId')
  async findAllPostComments(
    @Param('postId') postId: number,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return await this.commentsService.findAllPostComments(postId, page, limit);
  }

  //댓글 삭제 api
  @ApiOperation({
    summary: '댓글 삭제 API',
    description: '댓글/대댓글 삭제',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글 번호',
    required: true,
  })
  @ApiOkResponse({
    description: '댓글 삭제 성공',
    type: CreateCommentResponseDto, // TODO: 삭제 성공시 반환 DTO 만들기
  })
  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: number) {
    return this.commentsService.deleteComment(commentId);
  }

  // TODO: 단일 조회 고민해보기
}
