import { PickType } from '@nestjs/swagger';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommonEntity } from 'src/common/entities/common.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class CommentLikeEntity extends PickType(CommonEntity, [
  'createdAt',
  'updatedAt',
]) {
  @PrimaryGeneratedColumn()
  primaryCommentLikeId: number;

  @Column()
  isLike: boolean;

  @Column({ nullable: true })
  @RelationId((commentLike: CommentLikeEntity) => commentLike.user)
  primaryUserId: number;

  @ManyToOne(() => UserEntity, (user) => user.commentLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'primaryUserId' })
  user: UserEntity;

  @Column({ nullable: true })
  @RelationId((commentLike: CommentLikeEntity) => commentLike.comment)
  primaryCommentId: number;

  @ManyToOne(() => CommentEntity, (comment) => comment.commentLikes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'primaryCommentId' })
  comment: CommentEntity;
}
