import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';


@Module({
  imports:[TypeOrmModule.forFeature([Comment])],
  providers:[CommentService],
  controllers:[CommentController]
})
export class CommentModule {}
