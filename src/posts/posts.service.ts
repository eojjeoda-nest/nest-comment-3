import { Injectable } from '@nestjs/common';
import { CreatePostRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CreatePostResponseDto } from './dto/response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postEntityRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
  ) {}

  async create(
    createPostRequestDto: CreatePostRequestDto,
  ): Promise<CreatePostResponseDto> {
    const { userId, content, title } = createPostRequestDto;

    const userEntity = await this.userEntityRepository.findOne({
      where: { userId },
    });

    // FIXME: 에러처리 다시하기
    if (!userEntity) throw new Error('User not found');

    const postEntity = this.postEntityRepository.create({
      content,
      title,
      user: userEntity,
    });

    const savedPostEntity = await this.postEntityRepository.save(postEntity);

    const data: CreatePostResponseDto = {
      primaryPostId: savedPostEntity.primaryPostId,
      title: savedPostEntity.title,
      content: savedPostEntity.content,
      userId: savedPostEntity.user.userId,
    };

    return data;
  }
}
