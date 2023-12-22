import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Comment } from '../comment/entities/comment.entity';
import { CommentMapper } from '../comment/mapper/comment.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment])],
  controllers: [PostController],
  providers: [PostService, CommentMapper],
})
export class PostModule {}
