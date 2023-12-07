import { Module } from '@nestjs/common';
import { CommentService } from './service/comment.service';
import { CommentController } from './controller/comment.controller';

@Module({
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
