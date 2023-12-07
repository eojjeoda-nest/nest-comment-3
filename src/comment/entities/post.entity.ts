import { CommonEntity } from '../../common/entity/common.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Comment, (comment) => comment.post, { lazy: true })
  comments: Promise<Comment[]>;
}
