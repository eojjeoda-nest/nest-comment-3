import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Post } from './post.entity';

/*
1. 작성자1~20글자 사이
2. 내용 1~1000자 사이
3. 신고 수 (10번 이상 신고시 숨김처리, 중복 신고 불가)
4, 좋아요 수
 */

// Active Record Pattern
@Entity('comments')
export class Comment extends CommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  author: string;

  @Column()
  content: string;

  // 신고자

  //좋아요

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // 인접리스트 자기참조
  @ManyToOne(() => Comment, (category) => category.children)
  parent: Comment;

  @OneToMany(() => Comment, (category) => category.parent)
  children: Comment[];

  static of(partial: Partial<Comment>): Comment {
    const comment = new Comment();
    Object.assign(comment, partial);
    return comment;
  }
}
