import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import {
  CommentDto,
  RecommentDto,
  ResponseCommentDto,
} from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(dto: CommentDto) {
    const comment: Comment = plainToInstance(Comment, dto);
    const result = await this.commentRepository.save(comment);
    return plainToInstance(ResponseCommentDto, result);
  }

  async createRecomment(id: number, dto: RecommentDto) {
    dto.parentId = id;
    const recomment: Comment = plainToInstance(Comment, dto);
    const result = await this.commentRepository.save(recomment);
    return plainToInstance(ResponseCommentDto, result);
  }
}
