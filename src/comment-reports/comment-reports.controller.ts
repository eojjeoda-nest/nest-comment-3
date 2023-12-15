import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentReportsService } from './comment-reports.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCommentReportRequestDto } from './dto/request.dto';
import { CreateCommentReportResponseDto } from './dto/response.dto';

@ApiTags('댓글/대댓글 신고 관련 API')
@Controller('comment-reports')
export class CommentReportsController {
  constructor(private readonly commentReportsService: CommentReportsService) {}

  @ApiOperation({
    summary: '신고하기 API',
    description: '댓글/대댓글 신고하기',
  })
  @ApiParam({
    name: 'commentId',
    description: '댓글/대댓글 번호',
    required: true,
  })
  @ApiOkResponse({
    description: '신고하기 성공',
    type: CreateCommentReportResponseDto,
  })
  @Post(':commentId')
  create(
    @Param('commentId') commentId: number,
    @Body() createCommentReportRequestDto: CreateCommentReportRequestDto,
  ) {
    return this.commentReportsService.create(
      createCommentReportRequestDto,
      commentId,
    );
  }
}
