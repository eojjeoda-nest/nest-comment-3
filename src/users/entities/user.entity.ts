import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  primaryUserId: number;

  // TODO: userId에 unique 제약조건 추가하면 자동으로 확인해주는지 확인
  @Column({ length: 20, unique: true })
  userId: string;

  @Column({ length: 20 })
  userPw: string;

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
