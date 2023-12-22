import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { PostEntity } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity, UserEntity, PostEntity])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
