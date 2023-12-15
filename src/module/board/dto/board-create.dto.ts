import { ApiProperty } from "@nestjs/swagger";

export class BoardCreateDto{
    @ApiProperty({
        example: '1',
        description: '사용자Pk',
    })
    creatorId: number;
    @ApiProperty({
        example: '오늘 밥 뭡니까?',
        description: '게시글내용',
    })
    content: string;
}