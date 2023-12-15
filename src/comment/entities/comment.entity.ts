import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommonEntity } from '../../common/entity/common.entity';
import { Post } from './post.entity';
import { CommentGetDto } from '../dto/comment-get.dto';

/*
1. 작성자1~20글자 사이x
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

  @Column({ default: false })
  isHidden: boolean;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // 인접리스트 자기참조
  @ManyToOne(() => Comment, (category) => category.children, {
    onDelete: 'CASCADE',
  })
  parent: Comment;

  @OneToMany(() => Comment, (category) => category.parent, {
    cascade: true,
  })
  children: Comment[];

  static of(post: Post, partial: Partial<Comment>): Comment {
    const comment = new Comment();
    comment.post = post;
    Object.assign(comment, partial);

    return comment;
  }

  static replyOf(
    post: Post,
    parent: Comment,
    partial: Partial<Comment>,
  ): Comment {
    const comment = new Comment();
    comment.post = post;
    comment.parent = parent;
    Object.assign(comment, partial);

    return comment;
  }

  static async findAllComments(page: CommentGetDto) {
    const query = Comment.createQueryBuilder('comment')
      .where('comment.isHidden = :isHidden', { isHidden: false })
      .orderBy('comment.createdAt', 'DESC')
      .take(page.getLimit())
      .skip(page.getOffset())
      .leftJoinAndMapMany(
        'comment.children',
        Comment,
        'children',
        'children.parentId = comment.id',
      );

    return await query.getMany();
  }
}
