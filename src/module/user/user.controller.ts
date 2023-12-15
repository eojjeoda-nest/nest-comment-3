import { Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserMapper } from './mapper/user.mapper';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userMapper: UserMapper
    ){}
    @ApiOperation({ summary: '사용자 생성 API',})
    @Post()
    async createUser(
        @Body() userCreateDto: UserCreateDto,
        @Res() res: Response
    ): Promise<void>{
        const newUser = await this.userService.createUser(userCreateDto);
        const response = this.userMapper.EntityToDto(newUser);
        res.status(HttpStatus.CREATED).json(response);
    }
}
