import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreateCommentResponseDto } from './dto/response.dto';
import { CreateCommentRequestDto } from './dto/request.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentEntityRepository: Repository<CommentEntity>,
    @InjectRepository(UserEntity)
    private userEntityRepository: Repository<UserEntity>,
    @InjectRepository(PostEntity)
    private postEntityRepository: Repository<PostEntity>,
  ) {}

  // TODO: 예외처리 걸어주기
  async createComment(
    createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    const { userId, primaryPostId, content } = createCommentRequestDto;

    const userEntity = await this.userEntityRepository.findOne({
      where: { userId },
    });

    const postEntity = await this.postEntityRepository.findOne({
      where: { primaryPostId },
    });

    const commentEntity = this.commentEntityRepository.create({
      content,
      user: userEntity,
      post: postEntity,
    });

    const savedCommentEntity =
      await this.commentEntityRepository.save(commentEntity);

    const data: CreateCommentResponseDto = {
      commentId: savedCommentEntity.primaryCommentId,
      content: savedCommentEntity.content,
      userId: savedCommentEntity.user.userId,
      primaryPostId: savedCommentEntity.post.primaryPostId,
      isHide: savedCommentEntity.isHide,
    };

    return data;
  }

  // TODO: Depth가 2이 이상 어떻게 할지 고민해보기 => 막는다?
  async createRecomment(
    commentId: number,
    createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    const { userId, primaryPostId, content } = createCommentRequestDto;

    const userEntity = await this.userEntityRepository.findOne({
      where: { userId },
    });

    const postEntity = await this.postEntityRepository.findOne({
      where: { primaryPostId },
    });

    const parentComment = await this.commentEntityRepository.findOne({
      where: { primaryCommentId: commentId },
    });

    const recommentEntity = this.commentEntityRepository.create({
      content,
      user: userEntity,
      post: postEntity,
      parent: parentComment,
    });

    //TODO: 1번 방법 -> 덮어쓰기 방법??
    //comment.parentId = commentId;

    const savedRecommentEntity =
      await this.commentEntityRepository.save(recommentEntity);

    const data: CreateCommentResponseDto = {
      commentId: savedRecommentEntity.primaryCommentId,
      content: savedRecommentEntity.content,
      userId: savedRecommentEntity.user.userId,
      primaryPostId: savedRecommentEntity.post.primaryPostId,
      isHide: savedRecommentEntity.isHide,
    };

    return data;
  }

  async findAllPostComments(postId: number, page: number, limit: number) {
    const post = await this.postEntityRepository.findOne({
      where: { primaryPostId: postId },
    });

    // 이렇게 해줘야 가져옴, 왜 findOne으로 찾은 객체는 안되는걸까?
    const postEntity = this.postEntityRepository.create({
      primaryPostId: post.primaryPostId,
    });

    // total count 반환하려면, findAndCount 사용
    // TODO: 숨김처리된 대댓글은 제외하고 가져오거 어떻게 하지? where 조건으로 걸어주면 되려나?
    const [comments, totalCount] =
      await this.commentEntityRepository.findAndCount({
        where: { post: postEntity, isHide: false },
        relations: ['children', 'post', 'user'], // Join 연산이 너무 많이 일어날 수 있음.
        skip: (page - 1) * limit,
        take: limit,
      });

    const data: CreateCommentResponseDto[] = comments?.map((comment) => {
      return {
        commentId: comment.primaryCommentId,
        content: comment.content,
        primaryPostId: comment.post.primaryPostId,
        userId: comment.user.userId,
        isHide: comment.isHide,
        children: comment.children,
      };
    });

    const pageDate = {
      content: data,
      page: page,
      limit: limit,
      totalPage: Math.ceil(totalCount / limit),
    };

    return pageDate;
  }

  // TODO: 단일 조회 고려하기
  // async findOne(id: number) {
  //   const comment = await this.commentEntityRepository.findOne({
  //     where: { primaryCommentId: id },
  //     // relations: ['children', 'children.children','children.children.children'], // Join 연산이 너무 많이 일어날 수 있음.
  //     relations: ['children'], // 서비스 만들 때, 기획자랑 얘기해서 어떻게 할지 정해야 함.
  //   });

  //   return plainToInstance(CommentEntity, comment, {
  //     excludePrefixes: ['deletedAt', 'updatedAt'],
  //   });
  // }

  deleteComment(commentId: number) {
    return this.commentEntityRepository.delete({ primaryCommentId: commentId });
  }
}
