import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { Repository } from 'typeorm';
import { CommentLike } from './entities/comment-like.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../user/entities/user.entity';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentLikeMapper } from './mapper/comment-like.mapper';
import { CommentReportMapper } from './mapper/comment-report.mapper';
import { CommentReport } from './entities/comment-report.entity';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';

const mockCommentRepository = () => ({
  save: jest.fn(),
  exist: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  softDelete: jest.fn(),
});
const mockCommentLikeRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
});
const mockCommentReportRepository = () => ({
  save: jest.fn(),
  count: jest.fn(),
  exist: jest.fn(),
});
const mockUserRepository = () => ({
  exist: jest.fn(),
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuctionService', () => {
  let commentService: CommentService;
  let commentRepository: MockRepository<Comment>;
  let commentLikeRepository: MockRepository<CommentLike>;
  let commentReportRepository: MockRepository<CommentReport>;
  let userRepository: MockRepository<User>;
  let commentMapper: CommentMapper;
  let commentLikeMapper: CommentLikeMapper;
  let commentReportMapper: CommentReportMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        CommentMapper,
        CommentLikeMapper,
        CommentReportMapper,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository(),
        },
        {
          provide: getRepositoryToken(CommentLike),
          useValue: mockCommentLikeRepository(),
        },
        {
          provide: getRepositoryToken(CommentReport),
          useValue: mockCommentReportRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository(),
        },
      ],
    }).compile();

    commentService = module.get(CommentService);
    commentRepository = module.get(getRepositoryToken(Comment));
    commentLikeRepository = module.get(getRepositoryToken(CommentLike));
    commentReportRepository = module.get(getRepositoryToken(CommentReport));
    userRepository = module.get(getRepositoryToken(User));
    commentMapper = module.get(CommentMapper);
    commentLikeMapper = module.get(CommentLikeMapper);
    commentReportMapper = module.get(CommentReportMapper);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
    expect(commentRepository).toBeDefined();
    expect(commentLikeRepository).toBeDefined();
    expect(commentReportRepository).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(commentMapper).toBeDefined();
    expect(commentLikeMapper).toBeDefined();
    expect(commentReportMapper).toBeDefined();
  });

  describe('createComment()', () => {
    it('댓글 작성, 성공', async () => {
      // given
      const req = commentMapper.toTestPostCommentReq();
      const comment: Comment = plainToInstance(Comment, req);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(comment);
      const res = commentMapper.toPostCommentRes(comment, 0, 0);

      // when
      const result = await commentService.createComment(req);

      // then
      expect(result).toEqual(res);
    });
    it('대댓글 작성, 성공', async () => {
      // given
      const req = commentMapper.toTestPostCommentReq();
      const comment: Comment = plainToInstance(Comment, req);
      jest.spyOn(commentRepository, 'save').mockResolvedValue(comment);
      const res = commentMapper.toPostCommentRes(comment, 0, 0);

      // when
      const result = await commentService.createComment(req);

      // then
      expect(result).toEqual(res);
    });
    it('댓글 삭제, 성공', async () => {
      // given
      const commentId = 1;

      jest.spyOn(commentRepository, 'exist').mockResolvedValue(new Comment());
      const mockCommentRepositoryDeleteSpy = jest
        .spyOn(commentRepository, 'delete')
        .mockResolvedValue({ raw: [], affected: 1 });

      const res = commentMapper.toDeleteCommentRes(
        201,
        '댓글/대댓글을 성공적으로 삭제하였습니다.',
      );

      //when
      const result = await commentService.deleteComment(commentId);

      // then
      expect(result).toEqual(res);
      expect(mockCommentRepositoryDeleteSpy).toHaveBeenCalledWith({
        id: commentId,
      });
    });
    it('댓글 삭제, 실패(댓글을 찾을 수 없음)', () => {
      // given
      const commentId = 1;

      const mockCommentRepositoryExistSpy = jest
        .spyOn(commentRepository, 'exist')
        .mockResolvedValue(undefined);

      //when
      const result = async () => {
        await commentService.deleteComment(commentId);
      };

      // then
      expect(result).rejects.toThrowError(
        new NotFoundException('댓글을 찾을 수 없습니다.'),
      );
      expect(mockCommentRepositoryExistSpy).toHaveBeenCalledWith({
        where: { id: commentId },
      });
    });
    it('댓글 삭제, 실패(댓글 삭제에 실패)', () => {
      // given
      const commentId = 1;

      jest.spyOn(commentRepository, 'exist').mockResolvedValue(new Comment());
      jest
        .spyOn(commentRepository, 'delete')
        .mockResolvedValue({ raw: [], affected: 0 });

      //when
      const result = async () => {
        await commentService.deleteComment(commentId);
      };

      // then
      expect(result).rejects.toThrowError(
        new NotFoundException('댓글 삭제에 실패했습니다. 다시 시도해주세요.'),
      );
    });
    it.todo('좋아요, 성공');
    it.todo('좋아요, 실패(좋아요 할 댓글이 존재하지 않음)');
    it.todo('좋아요, 실패(존재하지 않는 유저)');
    it.todo('좋아요, 실패(이미 좋아요 한 댓글)');
    it.todo('신고하기, 성공');
    it.todo('신고하기, 실패(신고할 댓글이 존재하지 않음)');
    it.todo('신고하기, 실패(존재하지 않는 유저)');
    it.todo('신고하기, 실패(이미 신고한 댓글)');
  });
});
