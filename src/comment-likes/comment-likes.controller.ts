import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeRequestDto } from './dto/request.dto';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentLikeResponseDto } from './dto/response.dto';

@ApiTags('댓글/대댓글 좋아요 관련 API')
@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @ApiOperation({
    summary: '좋아요 누르기 API',
    description: '댓글/대댓글 좋아요 누르기',
  })
  @ApiOkResponse({
    description: '좋아요 누르기 성공',
    type: CreateCommentLikeResponseDto,
  })
  @ApiBadRequestResponse({
    description: '좋아요가 이미 눌러져 있을 경우',
    // type: Error, //TODO: 에러에 대한 타입을 따로 정의해야 할까?
  })
  @ApiParam({
    name: 'primaryCommentId',
    description: '댓글/대댓글 아이디',
    required: true,
  })
  // @ApiBody({ // TODO: body에 들어가는 값을 따로 명세를 안해줘도 괜찮을까?
  //   type: CreateCommentLikeRequestDto,
  //   description: '댓글/대댓글 좋아요 누르기 요청 DTO',
  // })
  @Post(':primaryCommentId')
  async create(
    @Param('primaryCommentId') primaryCommentId: number,
    @Body() createCommentLikeRequestDto: CreateCommentLikeRequestDto,
  ) {
    // TODO: 반환 타입 지정 안해도 될까? 하는게 좋을까?
    return await this.commentLikesService.create(
      createCommentLikeRequestDto,
      primaryCommentId,
    );
  }
}
