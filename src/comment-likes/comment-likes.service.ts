import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    primaryCommentId: number,
  ) {
    const { primaryUserId } = createCommentLikeRequestDto;

    const userExistValue = await this.userEntityRepository.exist({
      where: {
        primaryUserId,
      },
    });
    if (!userExistValue) new NotFoundException('존재하지 않는 유저입니다.');

    const commentExistValue = await this.commentEntityRepository.exist({
      where: {
        primaryCommentId: primaryCommentId,
      },
    });
    if (!commentExistValue) new NotFoundException('존재하지 않는 댓글입니다.');

    console.log(primaryCommentId, primaryUserId);

    const commentLike = await this.commentLikeEntityRepository.findOne({
      where: { primaryCommentId, primaryUserId },
    });

    // 없으면 댓글좋아요 테이블에 유저 추가
    if (commentLike === null) {
      const newCommentLikeEntity = this.commentLikeEntityRepository.create({
        isLike: true,
        primaryUserId,
        primaryCommentId,
      });
      await this.commentLikeEntityRepository.save(newCommentLikeEntity);

      // TODO: 중복 어떻게 줄이는게 좋을까?
      const comment = await this.commentEntityRepository.findOne({
        where: { primaryCommentId },
      });
      comment.likeCount += 1;
      await this.commentEntityRepository.save(comment);

      // TODO: 반환 값 어떻게 관리하는게 좋을까?
      const data: CreateCommentLikeResponseDto = {
        primaryCommentId: newCommentLikeEntity.comment.primaryCommentId,
        isLike: newCommentLikeEntity.isLike,
      };

      return data;
    }
    // 있으면 likeCount 값 확인
    else {
      if (commentLike.isLike === true)
        throw new BadRequestException('이미 좋아요를 누른 댓글입니다.');
      else {
        // TODO: 이런건 하나만 실패해도 롤백되어야 할 것 같은데? 순서를 바꾸면 되긴 하지만 다른 상황일 때 생각해보자
        commentLike.isLike = true;
        await this.commentLikeEntityRepository.save(commentLike);

        // TODO: 중복 어떻게 줄이는게 좋을까?
        const comment = await this.commentEntityRepository.findOne({
          where: { primaryCommentId },
        });
        comment.likeCount += 1;
        await this.commentEntityRepository.save(comment);

        const data: CreateCommentLikeResponseDto = {
          primaryCommentId: primaryCommentId,
          isLike: commentLike.isLike,
        };

        return data;
      }
    }
  }
}
