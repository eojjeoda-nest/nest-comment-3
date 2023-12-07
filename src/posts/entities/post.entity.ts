import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PostEntity extends CommentEntity {
  @PrimaryGeneratedColumn()
  primaryPostId: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @ManyToMany(() => UserEntity, (user) => user.posts)
  user: UserEntity;
}
