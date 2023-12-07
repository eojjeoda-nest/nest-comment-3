import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'testId',
    description: '유저 아이디',
    required: true,
  })
  @IsString({ message: '유저 아이디는 문자열로 입력해주세요.' })
  @IsNotEmpty({ message: '유저 아이디는 필수 입력입니다.' })
  userId: string;

  @ApiProperty({
    example: 'testPw1234!',
    description: '유저 비밀번호',
    required: true,
  })
  @IsString({ message: '유저 비밀번호는 문자열로 입력해주세요.' })
  @IsNotEmpty({ message: '유저 비밀번호는 필수 입력입니다.' })
  userPw: string;
}
