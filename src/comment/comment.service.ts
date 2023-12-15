import { Injectable, NotFoundException } from '@nestjs/common';
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

  async deleteComment(id: number) {
    const comment = await this.commentRepository.exist({ where: { id: id } });
    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    await this.commentRepository.delete({ id: id });
    return { status: 201, message: '성공적으로 댓글/대댓글을 삭제하였습니다.' };
  }
}
