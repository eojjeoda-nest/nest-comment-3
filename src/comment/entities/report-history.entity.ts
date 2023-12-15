import { CommonEntity } from '../../common/entity/common.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_histories')
export class ReportHistory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  commentId: number;

  static of(ip: string, commentId: number): ReportHistory {
    const reportHistory = new ReportHistory();
    reportHistory.ip = ip;
    reportHistory.commentId = commentId;

    return reportHistory;
  }
}
