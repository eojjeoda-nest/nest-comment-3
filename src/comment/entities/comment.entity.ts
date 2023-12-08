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
  @ApiProperty({ description: 'commentId' })
  commentId: number;
  @ManyToOne(() => Comment, (comment) => comment.recomments)
  @JoinColumn({ name: 'commentId' })
  parent: Comment;
  @OneToMany(() => Comment, (comment) => comment.parent)
  recomments: Comment[];
  @CreateDateColumn({
    type: 'timestamp',
  })
  @ApiProperty({ description: 'createdAt' })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: 'deletedAt' })
  deletedAt: Date | null;
}
