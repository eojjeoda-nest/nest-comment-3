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
    const post = await this.getPostById(postId);

    const comment = await Comment.of(post, commentCreateDto);
    await Comment.save(comment);
  }

  // Post관련 기능이 따로 없어서 분리하지 않음!
  async getPostById(postId: number) {
    const post = await Post.findOneBy({ id: postId });
    if (!post) {
      throw new PostNotFoundException();
    }

    return post;
  }
}
