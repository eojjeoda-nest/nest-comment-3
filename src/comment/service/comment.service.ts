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
import { CommentConstants } from '../constants/comment.constants';

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
    await this.checkDuplicatedReport(ip, commentId);
    const reportHistory = ReportHistory.of(ip, comment.id);
    await ReportHistory.save(reportHistory);
    await this.countReportAndHide(commentId);
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

  private async checkDuplicatedReport(ip: string, commentId: number) {
    const existHistory = await ReportHistory.findBy({ ip, commentId });

    // 이미 신고한 댓글
    if (existHistory.length > 0) {
      throw new DuplicatedCommentReportException();
    }
  }

  private async countReportAndHide(commentId: number) {
    const reportCount = await ReportHistory.countBy({ commentId });
    if (reportCount >= CommentConstants.REPORT_COUNT_FOR_HIDE) {
      const comment = await this.getCommentById(commentId);
      comment.isHidden = true;
      await Comment.save(comment);
    }
  }
}
