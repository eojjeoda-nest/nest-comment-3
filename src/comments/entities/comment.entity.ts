import { CommonEntity } from 'src/common/entities/common.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  primaryCommentId: number;

  @Column()
  content: string;

  @Column({ default: false })
  isHide: boolean;

  // 여기서 relation 설정 어떻게 할지 고민해보기
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments)
  @JoinColumn({ name: 'post' })
  post: PostEntity;

  //TODO: 1번 방법
  // // 이렇게 한 경우 생각해보기 -> 서비스에서 객체를 할당하지 않는다. 덮어쓰기 느낌이라 잘 모르겠다..
  // @Column({ nullable: true })
  // parentId: number;

  // @ManyToOne(() => CommentEntity, (comment: CommentEntity) => comment.children)
  // @JoinColumn({ name: 'parentId' }) //
  // parent: CommentEntity;

  @ManyToOne(() => CommentEntity, (comment: CommentEntity) => comment.children)
  @JoinColumn({ name: 'parent' }) //
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.parent)
  children: CommentEntity[];
}
