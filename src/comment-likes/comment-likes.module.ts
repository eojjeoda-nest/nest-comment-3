import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CommentLikeEntity } from './entities/comment-like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentLikeEntity, UserEntity, CommentEntity]),
  ],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
})
export class CommentLikesModule {}
