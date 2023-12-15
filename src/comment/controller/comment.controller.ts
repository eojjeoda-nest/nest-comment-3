import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { PostCommentCreateDto } from '../dto/post-comment.create.dto';
import { ReplyCommentCreateDto } from '../dto/reply-comment.create.dto';
import { Comment } from '../entities/comment.entity';
import { CommentGetDto } from '../dto/comment-get.dto';
import { Page } from '../../common/dto/page-response.dto';
import { RealIp } from 'nestjs-real-ip';

@Controller('/api/v1/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 대댓글 작성 api
  @Post('/reply')
  async createReply(@Body() commentCreateDto: ReplyCommentCreateDto) {
    await this.commentService.createReply(commentCreateDto);
    return;
  }

  // 댓글 작성 api
  @Post()
  async create(@Body() commentCreateDto: PostCommentCreateDto) {
    await this.commentService.create(commentCreateDto);
    return;
  }

  // 댓글 조회 api
  @Get()
  async findAll(@Query() page: CommentGetDto) {
    const total = await Comment.count();
    const comments = await Comment.find({
      take: page.getLimit(),
      skip: page.getOffset(),
    });
    return new Page(total, page.pageSize, comments);
  }

  // 댓글 삭제 api
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    await this.commentService.delete(id);
  }

  // 신고하기 api
  @Post('/report/:id')
  async report(@Param('id') id: number, @RealIp() ip: string) {
    await this.commentService.report(ip, id);
  }

  // 좋아요 api
  @Post('/like/:id')
  async like(@Param('id') id: number, @RealIp() ip: string) {
    await this.commentService.like(ip, id);
  }
}
