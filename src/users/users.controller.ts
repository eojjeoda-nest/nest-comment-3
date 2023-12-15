import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserResponseDto } from './dto/response.dto';

@ApiTags('회원가입 API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입',
  })
  @ApiOkResponse({
    description: '회원가입 성공',
    type: CreateUserResponseDto,
  })
  @Post()
  create(
    @Body() createUserResquestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserResquestDto);
  }
}
