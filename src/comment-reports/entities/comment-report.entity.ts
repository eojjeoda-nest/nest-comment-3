import { OmitType } from '@nestjs/swagger';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class CommentReportEntity extends OmitType(CommonEntity, ['deletedAt']) {
  @PrimaryGeneratedColumn()
  primaryCommentReportId: number;

  @Column()
  isReport: boolean;

  @Column()
  reportReason: string;

  @Column()
  @RelationId((commentReport: CommentReportEntity) => commentReport.reportUser)
  primaryUserId: number;
  @ManyToOne(() => UserEntity, (user) => user.commentReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'primaryUserId' })
  reportUser: UserEntity;

  @Column()
  @RelationId(
    (commentReport: CommentReportEntity) => commentReport.reportComment,
  )
  primaryCommentId: number;
  @ManyToOne(() => CommentEntity, (comment) => comment.commentReports, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'primaryCommentId' })
  reportComment: CommentEntity;
}
