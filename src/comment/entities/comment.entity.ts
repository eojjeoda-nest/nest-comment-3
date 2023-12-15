import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;
  @Column()
  @ApiProperty({ description: 'writer' })
  writer: string;
  @Column()
  @ApiProperty({ description: 'content' })
  content: string;
  @Column()
  @ApiProperty({ description: 'postId' })
  postId: number;
  @Column()
  @ApiProperty({ description: 'userId' })
  userId: number;
  @Column({ nullable: true })
  @ApiProperty({ description: 'parentId' })
  parentId: number;
  @ManyToOne(() => Comment, (comment) => comment.recomments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent: Comment;
  @OneToMany(() => Comment, (comment) => comment.parent, {
    cascade: true,
  })
  recomments: Comment[];
  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'postId' })
  post: Post;
  @CreateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'deletedAt' })
  deletedAt: Date | null;
}
