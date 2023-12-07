import { Injectable } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserResponseDto } from './dto/response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(
    createUseRequestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const userEntity = this.userEntityRepository.create(createUseRequestDto);

    const savedUserEntity = await this.userEntityRepository.save(userEntity);

    // TODO: 이 부분을 class-transformer를 사용해서 자동으로 변환해주는지 확인
    const data: CreateUserResponseDto = {
      userId: savedUserEntity.userId,
    };

    return data;
  }
}
