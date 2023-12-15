import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentReportRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentReportEntity } from './entities/comment-report.entity';
import { CreateCommentReportResponseDto } from './dto/response.dto';
import { MAX_REPORT_COUNT } from './constants';

@Injectable()
export class CommentReportsService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
    @InjectRepository(CommentReportEntity)
    private commentReportEntityRepository: Repository<CommentReportEntity>,
  ) {}
  async create(
    CreateCommentReportRequestDto: CreateCommentReportRequestDto,
    primaryCommentId: number,
  ) {
    const { reportReason, primaryUserId } = CreateCommentReportRequestDto;

    const userExistValue = await this.userEntityRepository.exist({
      where: {
        primaryUserId,
      },
    });
    if (!userExistValue) new NotFoundException('존재하지 않는 유저입니다.');

    const commentExistValue = await this.commentEntityRepository.exist({
      where: {
        primaryCommentId: primaryCommentId,
      },
    });
    if (!commentExistValue) new NotFoundException('존재하지 않는 댓글입니다.');

    const commentReport = await this.commentReportEntityRepository.findOne({
      where: {
        primaryCommentId,
        primaryUserId,
      },
    });

    if (commentReport === null) {
      const newCommentReport = this.commentReportEntityRepository.create({
        isReport: true,
        reportReason: reportReason,
        primaryUserId,
        primaryCommentId,
      });

      const comment = await this.commentEntityRepository.findOne({
        where: { primaryCommentId },
        relations: ['user'],
      });

      comment.reportCount += 1;

      if (comment.reportCount >= MAX_REPORT_COUNT) comment.isHide = true;

      await this.commentEntityRepository.save(comment);

      const savedCommentReport =
        await this.commentReportEntityRepository.save(newCommentReport);

      const data: CreateCommentReportResponseDto = {
        userId: comment.user.userId,
        primaryCommentId,
        primaryUserId,
        isReport: savedCommentReport.isReport,
        reportReason: savedCommentReport.reportReason,
      };

      return data;
    } else {
      if (commentReport.isReport === true) {
        return '이미 신고한 댓글입니다.';
      } else {
        commentReport.isReport = true;
        commentReport.reportReason = reportReason;
        const savedCommentReport =
          await this.commentReportEntityRepository.save(commentReport);

        const comment = await this.commentEntityRepository.findOne({
          where: { primaryCommentId: primaryCommentId },
          relations: ['user'],
        });

        comment.reportCount += 1;

        if (comment.reportCount >= MAX_REPORT_COUNT) comment.isHide = true;

        await this.commentEntityRepository.save(comment);

        const data: CreateCommentReportResponseDto = {
          userId: comment.user.userId,
          primaryCommentId,
          primaryUserId,
          isReport: savedCommentReport.isReport,
          reportReason: savedCommentReport.reportReason,
        };

        return data;
      }
    }
  }
}
