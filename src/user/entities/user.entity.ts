import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentLike } from '../../comment/entities/comment-like.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];

  @OneToMany(() => CommentLike, (commentLike) => commentLike.user)
  commentLike: CommentLike[];
}
