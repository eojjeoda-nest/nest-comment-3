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

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  writer: string;
  @Column()
  content: string;
  @Column()
  postId: number;
  @Column()
  userId: number;
  @Column({ nullable: true })
  commentId: number;
  @ManyToOne(() => Comment, (comment) => comment.recomments)
  @JoinColumn({ name: 'commentId' })
  parent: Comment;
  @OneToMany(() => Comment, (comment) => comment.parent)
  recomments: Comment[];
  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | null;
}
