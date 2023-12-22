import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentMapper } from './mapper/comment.mapper';
import { CommentLike } from './entities/comment-like.entity';
import { User } from '../user/entities/user.entity';
import { CommentLikeMapper } from './mapper/comment-like.mapper';
import { CommentReport } from './entities/comment-report.entity';
import { CommentReportMapper } from './mapper/comment-report.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, CommentLike, CommentReport]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    CommentMapper,
    CommentLikeMapper,
    CommentReportMapper,
  ],
})
export class CommentModule {}
