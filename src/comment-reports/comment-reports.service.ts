import { Injectable } from '@nestjs/common';
import { CreateCommentReportRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentReportEntity } from './entities/comment-report.entity';
import { CreateCommentReportResponseDto } from './dto/response.dto';

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
    commentId: number,
  ) {
    const { reportReason, userId } = CreateCommentReportRequestDto;

    const userEntity = await this.userEntityRepository.findOne({
      where: { userId },
    });

    const createUserEntity = this.userEntityRepository.create({
      userId: userEntity.userId,
    });

    const commentEntity = await this.commentEntityRepository.findOne({
      where: { primaryCommentId: commentId },
    });

    const createCommentEntity = this.commentEntityRepository.create({
      primaryCommentId: commentEntity.primaryCommentId,
    });

    const commentReportEntity =
      await this.commentReportEntityRepository.findOne({
        where: {
          reportComment: createCommentEntity,
          reportUser: createUserEntity,
        },
      });

    if (commentReportEntity === null) {
      const newCommentReportEntity = this.commentReportEntityRepository.create({
        isReport: true,
        reportReason: reportReason,
        reportUser: userEntity,
        reportComment: commentEntity,
      });

      const comment = await this.commentEntityRepository.findOne({
        where: { primaryCommentId: commentId },
      });

      comment.reportCount += 1;

      if (comment.reportCount >= 10) comment.isHide = true;

      await this.commentEntityRepository.save(comment);

      const saved = await this.commentReportEntityRepository.save(
        newCommentReportEntity,
      );

      const data: CreateCommentReportResponseDto = {
        userId: userId,
        primaryCommentId: commentId,
        isReport: saved.isReport,
        reportReason: saved.reportReason,
      };

      return data;
    } else {
      if (commentReportEntity.isReport === true) {
        return '이미 신고한 댓글입니다.';
      } else {
        commentReportEntity.isReport = true;
        commentReportEntity.reportReason = reportReason;
        const saved =
          await this.commentReportEntityRepository.save(commentReportEntity);

        const comment = await this.commentEntityRepository.findOne({
          where: { primaryCommentId: commentId },
        });

        comment.reportCount += 1;

        if (comment.reportCount >= 10) comment.isHide = true;

        await this.commentEntityRepository.save(comment);

        const data: CreateCommentReportResponseDto = {
          userId: userId,
          primaryCommentId: commentId,
          isReport: saved.isReport,
          reportReason: saved.reportReason,
        };

        return data;
      }
    }

    // findAll() {
    //   return `This action returns all commentReports`;
    // }

    // findOne(id: number) {
    //   return `This action returns a #${id} commentReport`;
    // }

    // update(id: number, updateCommentReportDto: UpdateCommentReportDto) {
    //   return `This action updates a #${id} commentReport`;
    // }

    // remove(id: number) {
    //   return `This action removes a #${id} commentReport`;
    // }
  }
}
