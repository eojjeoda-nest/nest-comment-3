import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentCreateDto } from './dto/comment-create.dto';
import { Response } from 'express';
import { CommentService } from './comment.service';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentReplyCreateDto } from './dto/comment-reply-create.dto';

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

    @ApiOperation({ summary: '대댓글 생성 API'})
    @Post('/reply')
    async createReplyComment(
        @Body() commentReplyCreateDto: CommentReplyCreateDto,
        @Res() res: Response
    ): Promise<void>{
        const newReplyComment = await this.commentService.createReplyComment(commentReplyCreateDto);
        const response = await this.commentMapper.ReplyEntityToDto(newReplyComment);
        res.status(HttpStatus.CREATED).json(response);
    }
}
