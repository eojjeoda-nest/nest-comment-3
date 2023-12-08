import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { IsNull, Repository } from 'typeorm';
import { Comment } from '../comment/entities/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findCommentsByPostId(id: number) {
    const comments = this.commentRepository.find({
      where: { postId: id, parentId: IsNull() },
      relations: ['recomments'],
    });
    return comments;
  }
}
