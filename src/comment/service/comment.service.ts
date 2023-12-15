import { Injectable } from '@nestjs/common';
import { PostNotFoundException } from '../../common/error/exceptions/post.exception';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import {
  CommentNotFondException,
  DuplicatedCommentReportException,
} from '../../common/error/exceptions/comment.exception';
import { PostCommentCreateDto } from '../dto/post-comment.create.dto';
import { ReplyCommentCreateDto } from '../dto/reply-comment.create.dto';
import { ReportHistory } from '../entities/report-history.entity';

@Injectable()
export class CommentService {
  async create(commentCreateDto: PostCommentCreateDto) {
    const { postId } = commentCreateDto;
    const post = await this.getPostById(postId);
    const comment = Comment.of(post, commentCreateDto);

    await Comment.save(comment);
  }

  async createReply(commentCreateDto: ReplyCommentCreateDto) {
    const { parentId } = commentCreateDto;
    const parent = await this.getCommentById(parentId);
    const post = parent.post;

    const comment = Comment.replyOf(post, parent, commentCreateDto);

    await Comment.save(comment);
  }

  async report(ip: string, commentId: number) {
    const comment = await this.getCommentById(commentId);
    if (await this.isDuplicateReport(ip, commentId)) {
      throw new DuplicatedCommentReportException();
    }
    const reportHistory = ReportHistory.of(ip, comment.id);
    await ReportHistory.save(reportHistory);
  }

  // Post관련 기능이 따로 없어서 분리하지 않음!
  async getPostById(postId: number) {
    const post = await Post.findOneBy({ id: postId });
    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }

  async getCommentById(commentId: number) {
    const comment = await Comment.findOneBy({ id: commentId });
    if (!comment) {
      throw new CommentNotFondException();
    }

    return comment;
  }

  private async isDuplicateReport(ip: string, commentId: number) {
    const existHistory = await ReportHistory.findBy({ ip, commentId });
    return existHistory.length > 0;
  }
}
