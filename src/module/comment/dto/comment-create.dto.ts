import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";
import { Column } from "typeorm";

export class CommentCreateDto{

    @ApiProperty({
        example: '댓글 내용',
        description: '아 오늘 치킨 땡기네',
    })
    // @Min(1, { message: '댓글은 최소 1자 이상이어야 합니다.' })
    // @Max(1000,{ message: '댓글은 최대 1000자 제한입니다.' })
    @Column()
    content: string;

    @ApiProperty({
        example: '1',
        description: '게시물id',
    })
    @IsNumber()
    boardId: number;

    @ApiProperty({
        example: '1',
        description: '사용자id',
    })
    @IsNumber()
    creatorId: number;
}