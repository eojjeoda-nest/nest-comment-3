import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { BoardCreateDto } from './dto/board-create.dto';
import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { BoardMapper } from './mapper/board.mapper';

@Controller('board')
export class BoardController {
    constructor(
        private readonly boardService: BoardService,
        private readonly boardMapper: BoardMapper
    ){}
    
    @ApiOperation({
        summary: '게시물 생성API'})
    @Post()
    async createBoard(
        @Body() boardCreateDto: BoardCreateDto,
        @Res() res: Response
    ): Promise<void>{
        const newBoard = await this.boardService.createBoard(boardCreateDto);
        const response = this.boardMapper.EntityToDto(newBoard);
        res.status(HttpStatus.CREATED).json(response);
    }
}
