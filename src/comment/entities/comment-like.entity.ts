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

  @Column()
  @RelationId((self: CommentLike) => self.user)
  userId;

  @Column()
  @RelationId((self: CommentLike) => self.comment)
  commentId;

  @ManyToOne(() => User, (user) => user.commentLike)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.like, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'commentId' })
  comment: Comment;
}
