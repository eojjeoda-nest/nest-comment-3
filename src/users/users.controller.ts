import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiProperty({
    description: '유저 생성 API',
    type: CreateUserRequestDto,
  })
  @Post()
  create(
    @Body() createUserResquestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserResquestDto);
  }
}
