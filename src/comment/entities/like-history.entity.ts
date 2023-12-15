import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';

@Entity('like_histories')
export class LikeHistory extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  commentId: number;

  static of(ip: string, commentId: number): LikeHistory {
    const likeHistory = new LikeHistory();
    likeHistory.ip = ip;
    likeHistory.commentId = commentId;

    return likeHistory;
  }
}
