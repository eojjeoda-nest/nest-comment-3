import { Injectable } from '@nestjs/common';
import { BoardCreateDto } from './dto/board-create.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { NotFoundUserException } from '../user/userException/NotFoundUserException';
import { BoardMapper } from './mapper/board.mapper';

@Injectable()
export class BoardService{
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly boardMapper: BoardMapper
    ){}
    async createBoard(boardCreateDto: BoardCreateDto): Promise<Board>{
        const creator = await this.userRepository.findOne({where: {id: boardCreateDto.creatorId}});
        if(!creator){
            throw new NotFoundUserException();
        }
        const newBoard = this.boardMapper.DtoToEntity(boardCreateDto, creator);
        return await this.boardRepository.save(newBoard);
    }
}
