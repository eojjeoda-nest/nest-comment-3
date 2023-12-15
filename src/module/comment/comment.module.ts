import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment } from './entity/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { User } from '../user/entity/user.entity';
import { Board } from '../board/entity/board.entity';
import { CommentMapper } from './mapper/comment.mapper';


@Module({
  imports:[TypeOrmModule.forFeature([Comment,User,Board])],
  providers:[CommentService,CommentMapper],
  controllers:[CommentController]
})
export class CommentModule {}
