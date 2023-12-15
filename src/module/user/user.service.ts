import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserMapper } from './mapper/user.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly userMapper: UserMapper,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}
    async createUser(userCreateDto: UserCreateDto): Promise<User>{
        const userEntity = this.userMapper.DtoToEntity(userCreateDto);
        return await this.userRepository.save(userEntity);
    }
}
