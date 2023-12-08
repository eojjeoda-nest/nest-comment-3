import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
