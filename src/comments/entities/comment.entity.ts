import { CommentLikeEntity } from 'src/comment-likes/entities/comment-like.entity';
import { CommentReportEntity } from 'src/comment-reports/entities/comment-report.entity';
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
  RelationId,
} from 'typeorm';
import { COMMENT_VALIDATION_CONSTANTS } from '../constants';

@Entity()
export class CommentEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  primaryCommentId: number;

  @Column({
    type: 'varchar',
    length: COMMENT_VALIDATION_CONSTANTS.COMMENT_MAX_LENGTH,
  })
  content: string;

  @Column({ default: false })
  isHide: boolean;

  @Column({ default: 0 })
  likeCount: number;

  @Column({ default: 0 })
  reportCount: number;

  // 여기서 relation 설정 어떻게 할지 고민해보기
  @Column({ nullable: true })
  @RelationId((comment: CommentEntity) => comment.user)
  primaryUserId: number;
  @ManyToOne(() => UserEntity, (user: UserEntity) => user.comments)
  @JoinColumn({ name: 'primaryUserId' })
  user: UserEntity;

  @Column({ nullable: true })
  @RelationId((comment: CommentEntity) => comment.post)
  primaryPostId: number;
  @ManyToOne(() => PostEntity, (post: PostEntity) => post.comments)
  @JoinColumn({ name: 'primaryPostId' })
  post: PostEntity;

  //TODO: 1번 방법
  // // 이렇게 한 경우 생각해보기 -> 서비스에서 객체를 할당하지 않는다. 덮어쓰기 느낌이라 잘 모르겠다..
  // @Column({ nullable: true })
  // parentId: number;

  // @ManyToOne(() => CommentEntity, (comment: CommentEntity) => comment.children)
  // @JoinColumn({ name: 'parentId' }) //
  // parent: CommentEntity;

  @Column({ nullable: true })
  @RelationId((comment: CommentEntity) => comment.parent)
  primaryParentId: number;
  @ManyToOne(
    () => CommentEntity,
    (comment: CommentEntity) => comment.children,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'primaryParentId' }) //
  parent: CommentEntity;

  @OneToMany(() => CommentEntity, (comment: CommentEntity) => comment.parent, {
    cascade: true,
  })
  children: CommentEntity[];

  @OneToMany(
    () => CommentLikeEntity,
    (commentLike: CommentLikeEntity) => commentLike.comment,
    {
      cascade: true,
    },
  )
  commentLikes: CommentLikeEntity[];

  @OneToMany(
    () => CommentReportEntity,
    (commentReport: CommentReportEntity) => commentReport.reportComment,
    { cascade: true },
  )
  commentReports: CommentReportEntity[];
}
