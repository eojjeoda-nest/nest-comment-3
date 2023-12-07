import { Injectable } from '@nestjs/common';
import { CommentCreateDto } from '../dto/comment-create.dto';
import { PostNotFoundException } from '../../common/error/exceptions/post.exception';
import { Post } from '../entities/post.entity';
import { Comment } from '../entities/comment.entity';
import { CommentNotFondException } from '../../common/error/exceptions/comment.exception';

@Injectable()
export class CommentService {
  async create(commentCreateDto: CommentCreateDto) {
    const { postId } = commentCreateDto;
    await this.checkPostExists(postId);

    const comment = await Comment.of(commentCreateDto);
    await Comment.save(comment);
  }

  async checkPostExists(postId: number) {
    if (!(await Post.findOneBy({ id: postId }))) {
      throw new PostNotFoundException();
    }
  }
}
