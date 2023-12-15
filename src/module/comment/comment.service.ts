import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { Board } from '../board/entity/board.entity';
import { CommentCreateDto } from './dto/comment-create.dto';
import { NotFoundUserException } from '../user/userException/NotFoundUserException';
import { NotFoundBoardException } from '../board/boardException/NotFoundBoardException';
import { Comment } from './entity/comment.entity';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentReplyCreateDto } from './dto/comment-reply-create.dto';
import { NotFoundParentCommentException } from './commentException/NotFoundParentCommentException';
import { CommentUpdateLikesDto } from './dto/comment-update-likes.dto';
import { NotFoundCommentException } from './commentException/NotFoundCommentException';
import { UserLikesAlreadyException } from './commentException/UserLikesAlreadyException';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly commentMapper: CommentMapper
    ){}

    private userLikesMap = new Map<string, boolean>();

    async createComment(commentCreateDto: CommentCreateDto): Promise<Comment>{
        const creator = await this.userRepository.findOne({where: {id: commentCreateDto.creatorId}});
        if(!creator){
            throw new NotFoundUserException();
        }
        const board = await this.boardRepository.findOne({where: {id: commentCreateDto.boardId}});
        if(!board){
            throw new NotFoundBoardException();
        }
        const defaultDepth = 0;
        const newCommentEntity = this.commentMapper.DtoToEntity(commentCreateDto, creator, board, defaultDepth);
        return await this.commentRepository.save(newCommentEntity);
    }

    async createReplyComment(commentReplyCreateDto: CommentReplyCreateDto): Promise<Comment>{
        const creator = await this.userRepository.findOne({where: {id: commentReplyCreateDto.creatorId}});
        if(!creator){
            throw new NotFoundUserException();
        }
        const board = await this.boardRepository.findOne({where: {id: commentReplyCreateDto.boardId}});
        if(!board){
            throw new NotFoundBoardException();
        }
        const parentComment = await this.commentRepository.findOne({where: {id: commentReplyCreateDto.parentId}});
        if(!parentComment){
            throw new NotFoundParentCommentException();
        }
        const replyCommentDepth = parentComment.depth+1;
        const newReplyComment = this.commentMapper.ReplyDtoToEntity(commentReplyCreateDto, creator, board, replyCommentDepth);
        return await this.commentRepository.save(newReplyComment);
    }

    async updateCommentLikes(commentUpdateLikesDto: CommentUpdateLikesDto){
        const creator = await this.userRepository.findOne({where: {id: commentUpdateLikesDto.creatorId}});
        if(!creator){
            throw new NotFoundUserException();
        }
        const board = await this.boardRepository.findOne({where: {id: commentUpdateLikesDto.boardId}});
        if(!board){
            throw new NotFoundBoardException();
        }
        const comment = await this.commentRepository.findOne({where: {id: commentUpdateLikesDto.id}});
        if(!comment){
            throw new NotFoundCommentException();
        }
        
        const key = `${commentUpdateLikesDto.creatorId}_${commentUpdateLikesDto.id}`;

        if (!this.userLikesMap.has(key)) {
            comment.likesCount += 1; 
            this.userLikesMap.set(key, true);
        } else {
            throw new UserLikesAlreadyException();
        }
        return await this.commentRepository.save(comment);
    }

}
