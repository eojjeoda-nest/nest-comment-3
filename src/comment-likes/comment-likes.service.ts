import { Injectable } from '@nestjs/common';
import { CreateCommentLikeRequestDto } from './dto/request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentLikeEntity } from './entities/comment-like.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CreateCommentLikeResponseDto } from './dto/response.dto';

@Injectable()
export class CommentLikesService {
  constructor(
    @InjectRepository(CommentLikeEntity)
    private commentLikeEntityRepository: Repository<CommentLikeEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
  ) {}
  async create(
    createCommentLikeRequestDto: CreateCommentLikeRequestDto,
    commentId: number,
  ) {
    const { userId } = createCommentLikeRequestDto;

    // 댓글좋아요 테이블에서 있는지 확인
    const userEntity = await this.userEntityRepository.findOne({
      where: { userId },
    });

    const createUserEntity = this.userEntityRepository.create({
      userId: userEntity.userId,
    });

    const commentEntity = await this.commentEntityRepository.findOne({
      where: { primaryCommentId: commentId },
    });

    const createCommentEntity = this.commentEntityRepository.create({
      primaryCommentId: commentEntity.primaryCommentId,
    });

    const commentLikeEntity = await this.commentLikeEntityRepository.findOne({
      where: { comment: createCommentEntity, user: createUserEntity },
    });

    // 없으면 댓글좋아요 테이블에 유저 추가
    if (commentLikeEntity === null) {
      const newCommentLikeEntity = this.commentLikeEntityRepository.create({
        isLike: true,
        user: userEntity,
        comment: commentEntity,
      });
      await this.commentLikeEntityRepository.save(newCommentLikeEntity);

      const comment = await this.commentEntityRepository.findOne({
        where: { primaryCommentId: commentId },
      });

      comment.likeCount += 1;

      await this.commentEntityRepository.save(comment);

      const data: CreateCommentLikeResponseDto = {
        commentId: newCommentLikeEntity.comment.primaryCommentId,
        isLike: newCommentLikeEntity.isLike,
      };

      return data;
    }
    // 있으면 likeCount 값 확인
    else {
      if (commentLikeEntity.isLike === true) {
        return '이미 좋아요를 누른 상태입니다.';
      } else {
        // TODO: 이런건 하나만 실패해도 롤백되어야 할 것 같은데? 순서를 바꾸면 되긴 하지만 다른 상황일 때 생각해보자
        commentLikeEntity.isLike = true;
        await this.commentLikeEntityRepository.save(commentLikeEntity);

        const comment = await this.commentEntityRepository.findOne({
          where: { primaryCommentId: commentId },
        });

        comment.likeCount += 1;

        await this.commentEntityRepository.save(comment);

        const data: CreateCommentLikeResponseDto = {
          commentId: commentId,
          isLike: commentLikeEntity.isLike,
        };

        return data;
      }
    }
  }

  // findAll() {
  //   return `This action returns all commentLikes`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} commentLike`;
  // }

  // update(id: number, updateCommentLikeDto: UpdateCommentLikeDto) {
  //   return `This action updates a #${id} commentLike`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} commentLike`;
  // }
}
