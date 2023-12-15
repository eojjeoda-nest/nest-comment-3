import { Injectable, NotFoundException } from '@nestjs/common';
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
    const { primaryUserId, primaryPostId, content } = createCommentRequestDto;

    const userExistValue = await this.userEntityRepository.exist({
      where: {
        primaryUserId,
      },
    });
    if (!userExistValue)
      throw new NotFoundException('존재하지 않는 유저입니다.');

    const postExistValue = await this.postEntityRepository.exist({
      where: {
        primaryPostId,
      },
    });
    if (!postExistValue)
      throw new NotFoundException('존재하지 않는 게시글입니다.');

    const comment = this.commentEntityRepository.create({
      content,
      primaryUserId,
      primaryPostId,
    });

    const savedComment = await this.commentEntityRepository.save(comment);

    const data: CreateCommentResponseDto = {
      primaryCommentId: savedComment.primaryCommentId,
      primaryPostId,
      primaryUserId,
      content,
      isHide: savedComment.isHide,
      likeCount: savedComment.likeCount,
    };

    return data;
  }

  // TODO: Depth가 2이 이상 어떻게 할지 고민해보기 => 막는다?
  async createRecomment(
    primaryCommentId: number,
    createCommentRequestDto: CreateCommentRequestDto,
  ): Promise<CreateCommentResponseDto> {
    const { primaryUserId, primaryPostId, content } = createCommentRequestDto;

    const userExistValue = await this.userEntityRepository.exist({
      where: {
        primaryUserId,
      },
    });
    if (!userExistValue)
      throw new NotFoundException('존재하지 않는 유저입니다.');

    const postExistValue = await this.postEntityRepository.exist({
      where: {
        primaryPostId,
      },
    });
    if (!postExistValue)
      throw new NotFoundException('존재하지 않는 게시글입니다.');

    const parentComment = await this.commentEntityRepository.findOne({
      where: { primaryCommentId: primaryCommentId },
    });
    if (!parentComment)
      throw new NotFoundException('존재하지 않는 댓글입니다.');

    const newRecomment = this.commentEntityRepository.create({
      content,
      primaryUserId,
      primaryPostId,
      primaryParentId: primaryCommentId,
    });

    //TODO: 1번 방법 -> 덮어쓰기 방법??
    //comment.parentId = commentId;

    const savedRecomment =
      await this.commentEntityRepository.save(newRecomment);

    const data: CreateCommentResponseDto = {
      primaryCommentId: savedRecomment.primaryCommentId,
      primaryPostId,
      primaryUserId,
      content,
      isHide: savedRecomment.isHide,
      likeCount: savedRecomment.likeCount,
    };

    return data;
  }

  async findAllPostComments(
    primaryPostId: number,
    page: number,
    limit: number,
  ) {
    const postExistValue = await this.postEntityRepository.exist({
      where: {
        primaryPostId,
      },
    });
    if (!postExistValue)
      throw new NotFoundException('존재하지 않는 게시글입니다.');

    // total count 반환하려면, findAndCount 사용
    // TODO: 숨김처리된 대댓글은 제외하고 가져오거 어떻게 하지? where 조건으로 걸어주면 되려나?
    const [comments, totalCount] =
      await this.commentEntityRepository.findAndCount({
        where: { primaryPostId, isHide: false },
        relations: ['children', 'post', 'user'], // Join 연산이 너무 많이 일어날 수 있음.
        skip: (page - 1) * limit,
        take: limit,
      });

    const data: CreateCommentResponseDto[] = comments?.map((comment) => {
      return {
        primaryCommentId: comment.primaryCommentId,
        primaryPostId: comment.primaryPostId,
        primaryUserId: comment.primaryUserId,
        content: comment.content,
        isHide: comment.isHide,
        likeCount: comment.likeCount,
        children: comment.children, //TODO: 이 부분 결과 확인 필요 (Swagger 페이징 처리 확인 필요)
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

  deleteComment(commentId: number) {
    return this.commentEntityRepository.delete({ primaryCommentId: commentId });
  }
}
