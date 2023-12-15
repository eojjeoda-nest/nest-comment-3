import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { User } from '../user/entity/user.entity';
import { BoardMapper } from './mapper/board.mapper';

@Module({
    imports:[TypeOrmModule.forFeature([Board, User])],
    providers:[BoardService,BoardMapper],
    controllers:[BoardController]
})
export class BoardModule {}
