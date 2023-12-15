import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto{
    @ApiProperty({
        example: '최필규',
        description: '사용자닉네임',
    })
    nickname: string;
}