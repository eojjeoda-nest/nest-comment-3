import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { IsNull, Repository } from 'typeorm';
import { Comment } from '../comment/entities/comment.entity';
import { plainToInstance } from 'class-transformer';
import { PageDto } from '../global/dto/page.dto';
import { CommentMapper } from '../comment/mapper/comment.mapper';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private commentMapper: CommentMapper,
  ) {}

  async findCommentsByPostId(id: number, page: number, limit: number) {
    const take = limit;
    const [comments, total] = await this.commentRepository.findAndCount({
      take,
      skip: (page - 1) * limit,
      where: { postId: id, parentId: IsNull() },
      relations: ['recomments'],
    });

    const meta = plainToInstance(PageDto, {
      page: page,
      totalPage: Math.ceil(total / take),
      limit: take,
    });

    return this.commentMapper.toPostCommentPageRes(comments, meta);
  }
}
