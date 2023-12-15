import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { Column } from "typeorm";

export class CommentUpdateLikesDto{

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

    @ApiProperty({
        example: '1',
        description: '댓글id',
    })
    @IsNumber()
    id: number;
}