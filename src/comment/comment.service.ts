import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { PostCommentReq } from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';
import { CommentMapper } from './mapper/comment.mapper';
import { PostCommentLikeReq } from './dto/comment-like.dto';
import { CommentLike } from './entities/comment-like.entity';
import { User } from '../user/entities/user.entity';
import { CommentLikeMapper } from './mapper/comment-like.mapper';
import { PostCommentReportReq } from './dto/comment-report.dto';
import { CommentReportMapper } from './mapper/comment-report.mapper';
import { CommentReport } from './entities/comment-report.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(CommentLike)
    private commentLikeRepository: Repository<CommentLike>,
    @InjectRepository(CommentReport)
    private commentReportRepository: Repository<CommentReport>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private commentMapper: CommentMapper,
    private commentLikeMapper: CommentLikeMapper,
    private commentReportMapper: CommentReportMapper,
  ) {}

  async createComment(dto: PostCommentReq) {
    const comment: Comment = plainToInstance(Comment, dto);
    const result = await this.commentRepository.save(comment);
    return this.commentMapper.toPostCommentRes(result, 0, 0);
  }

  async createRecomment(id: number, dto: PostCommentReq) {
    const recomment: Comment = this.commentMapper.toEntity(dto, id);
    const result = await this.commentRepository.save(recomment);
    return this.commentMapper.toPostCommentRes(result, 0, 0);
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepository.exist({ where: { id: id } });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    const deleteResult = await this.commentRepository.delete({ id: id });

    if (deleteResult.affected == 0) {
      throw new NotFoundException(
        '댓글 삭제에 실패했습니다. 다시 시도해주세요.',
      );
    }
    return this.commentMapper.toDeleteCommentRes(
      201,
      '댓글/대댓글을 성공적으로 삭제하였습니다.',
    );
  }

  async createCommentLike(id: number, dto: PostCommentLikeReq) {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    const user = await this.userRepository.exist({ where: { id: dto.userId } });

    if (!comment) {
      throw new NotFoundException('좋아요 할 댓글이 존재하지 않습니다.');
    } else if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const isAlreadyLike = await this.commentLikeRepository.exist({
      where: { userId: dto.userId, commentId: id },
    });

    if (isAlreadyLike) {
      throw new BadRequestException('이미 좋아요 한 댓글입니다.');
    }

    const commentLike: CommentLike = this.commentLikeMapper.toEntity(id, dto);

    await this.commentLikeRepository.save(commentLike);
    return this.commentLikeMapper.toPostCommentLikeRes(
      201,
      '좋아요를 성공적으로 진행하였습니다.',
    );
  }
  async createCommentReport(id: number, dto: PostCommentReportReq) {
    const comment = await this.commentRepository.findOne({ where: { id: id } });
    const user = await this.userRepository.exist({ where: { id: dto.userId } });

    if (!comment) {
      throw new NotFoundException('신고할 댓글이 존재하지 않습니다.');
    } else if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    const isAlreadyReport = await this.commentReportRepository.exist({
      where: { userId: dto.userId, commentId: id },
    });

    if (isAlreadyReport) {
      throw new BadRequestException('이미 신고한 댓글입니다.');
    }

    const commentReport: CommentReport = this.commentReportMapper.toEntity(
      id,
      dto,
    );

    await this.commentReportRepository.save(commentReport);

    const reportCount = await this.commentReportRepository.count({
      where: { commentId: id },
    });

    if (reportCount >= 10) {
      await this.commentRepository.softDelete({ id: id });
    }

    return this.commentReportMapper.toPostCommentReportRes(
      201,
      '신고를 성공적으로 진행하였습니다.',
    );
  }
}
