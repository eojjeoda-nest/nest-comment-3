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
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  // @RelationId((self: CommentLike) => self.user)
  @Column()
  userId;

  // @RelationId((self: CommentLike) => self.comment)
  @Column()
  commentId;

  @ManyToOne(() => User, (user) => user.commentLike)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.like)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
