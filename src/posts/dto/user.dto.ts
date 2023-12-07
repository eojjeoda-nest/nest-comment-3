import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PostDto {
  @ApiProperty({
    example: '1',
    description: '게시글 번호',
  })
  @IsNotEmpty()
  primaryPostId: number;

  @ApiProperty({
    example: 'NestJS 게시판 만들어보기',
    description: '게시글 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'NestJS 관련 내용을 정리해보자!',
    description: '게시글 내용',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
