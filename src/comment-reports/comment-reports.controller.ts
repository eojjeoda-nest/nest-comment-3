import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentReportsService } from './comment-reports.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCommentReportRequestDto } from './dto/request.dto';

@ApiTags('댓글/대댓글 신고 관련 API')
@Controller('comment-reports')
export class CommentReportsController {
  constructor(private readonly commentReportsService: CommentReportsService) {}

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

  // @Get()
  // findAll() {
  //   return this.commentReportsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentReportsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCommentReportDto: UpdateCommentReportDto,
  // ) {
  //   return this.commentReportsService.update(+id, updateCommentReportDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentReportsService.remove(+id);
  // }
}
