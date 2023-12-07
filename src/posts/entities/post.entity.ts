import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
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
export class PostEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  primaryPostId: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({ name: 'user' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];
}
