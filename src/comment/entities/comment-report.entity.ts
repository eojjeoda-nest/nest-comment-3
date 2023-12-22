import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class CommentReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @RelationId((self: CommentReport) => self.user)
  userId;

  @Column()
  @RelationId((self: CommentReport) => self.comment)
  commentId;

  @ManyToOne(() => User, (user) => user.commentReport)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.report, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
