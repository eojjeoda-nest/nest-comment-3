import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { primaryUserId, content, title } = createPostRequestDto;

    const user = await this.userEntityRepository.findOne({
      where: { primaryUserId },
    });
    if (!user) throw new NotFoundException('존재하지 않는 유저입니다.');

    const postEntity = this.postEntityRepository.create({
      content,
      title,
      user,
    });

    const savedPostEntity = await this.postEntityRepository.save(postEntity);

    const data: CreatePostResponseDto = {
      primaryPostId: savedPostEntity.primaryPostId,
      title: savedPostEntity.title,
      content: savedPostEntity.content,
      userId: savedPostEntity.user.userId,
      primaryUserId: savedPostEntity.user.primaryUserId,
    };

    return data;
  }
}
