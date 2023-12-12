import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { PostCommentReq } from './dto/comment.dto';
import { plainToInstance } from 'class-transformer';
import { CommentMapper } from './mapper/comment.mapper';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private commentMapper: CommentMapper,
  ) {}

  async createComment(dto: PostCommentReq) {
    const comment: Comment = plainToInstance(Comment, dto);
    const result = await this.commentRepository.save(comment);
    return this.commentMapper.toPostCommentRes(result);
  }

  async createRecomment(id: number, dto: PostCommentReq) {
    const recomment: Comment = this.commentMapper.toEntity(dto, id);
    const result = await this.commentRepository.save(recomment);
    return this.commentMapper.toPostCommentRes(result);
  }
}
