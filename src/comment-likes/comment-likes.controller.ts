import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CreateCommentLikeRequestDto } from './dto/request.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('댓글 좋아요 관련 API')
@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post(':commentId')
  create(
    @Param('commentId') commentId: number,
    @Body() createCommentLikeRequestDto: CreateCommentLikeRequestDto,
  ) {
    return this.commentLikesService.create(
      createCommentLikeRequestDto,
      commentId,
    );
  }

  // @Get()
  // findAll() {
  //   return this.commentLikesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentLikesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCommentLikeDto: UpdateCommentLikeDto,
  // ) {
  //   return this.commentLikesService.update(+id, updateCommentLikeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentLikesService.remove(+id);
  // }
}
