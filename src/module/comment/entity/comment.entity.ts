import { Board } from "../../board/entity/board.entity";
import { BaseEntity } from "../../../global/common/base.entitiy";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entity/user.entity";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column()
    depth: number;

    @Column({nullable:true})
    parentId: number;

    @Column({default: 0})
    likesCount: number;

    @ManyToOne(type => Comment)
    @JoinColumn({name: "parentId"})
    parent: Comment;

    @ManyToOne(type => Board, board => board.comments)
    @JoinColumn({name: "board_id"})
    board: Board;

    @ManyToOne(type => User)
    @JoinColumn({name: "user_id"})
    creator: User;
}