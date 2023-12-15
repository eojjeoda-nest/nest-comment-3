import { CommonEntity } from '../../common/entity/common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('report_histories')
export class ReportHistory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  commentId: number;

  @ManyToOne(() => Comment, (comment) => comment.reportHistories)
  comment: Comment;

  static of(ip: string, commentId: number): ReportHistory {
    const reportHistory = new ReportHistory();
    reportHistory.ip = ip;
    reportHistory.commentId = commentId;

    return reportHistory;
  }
}
