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
    async createComment(commentCreateDto: CommentCreateDto): Promise<Comment>{
        const creator = await this.userRepository.findOne({where: {id: commentCreateDto.creatorId}});
        if(!creator){
            throw new NotFoundUserException();
        }
        const board = await this.boardRepository.findOne({where: {id: commentCreateDto.boardId}});
        if(!board){
            throw new NotFoundBoardException();
        }
        const newCommentEntity = this.commentMapper.DtoToEntity(commentCreateDto, creator, board);
        return await this.commentRepository.save(newCommentEntity);
    }
}
