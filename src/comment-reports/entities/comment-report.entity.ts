import { OmitType } from '@nestjs/swagger';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentReportEntity extends OmitType(CommonEntity, ['deletedAt']) {
  @PrimaryGeneratedColumn()
  primaryCommentReportId: number;

  @Column()
  isReport: boolean;

  @Column()
  reportReason: string;

  @ManyToOne(() => UserEntity, (user) => user.commentReports, {
    onDelete: 'CASCADE',
  })
  reportUser: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.commentReports, {
    onDelete: 'CASCADE',
  })
  reportComment: CommentEntity;
}
