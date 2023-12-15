import { User } from "../../user/entity/user.entity";
import { BaseEntity } from "../../../global/common/base.entitiy";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comment/entity/comment.entity";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  creator: User;

  @OneToMany((type) => Comment, (comment) => comment.board)
  comments: Comment[];
}