import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/comment.mapper';

@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly commentMapper: CommentMapper
    ){}

    @ApiOperation({ summary: '댓글 생성 API'})
    @Post()
    async createComment(
        @Body() commentCreateDto: CommentCreateDto,
        @Res() res: Response
    ): Promise<void>{
        const newComment = await this.commentService.createComment(commentCreateDto);
        const response = await this.commentMapper.EntityToDto(newComment);
        res.status(HttpStatus.CREATED).json(response);
    }
}
