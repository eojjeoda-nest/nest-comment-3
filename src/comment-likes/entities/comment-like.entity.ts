import { PickType } from '@nestjs/swagger';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentLikeEntity extends PickType(CommonEntity, [
  'createdAt',
  'updatedAt',
]) {
  @PrimaryGeneratedColumn()
  primaryCommentLikeId: number;

  @Column()
  isLike: boolean;

  @ManyToOne(() => UserEntity, (user) => user.commentLikes, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.commentLikes, {
    onDelete: 'CASCADE',
  })
  comment: CommentEntity;
}
