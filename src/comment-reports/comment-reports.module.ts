import { Module } from '@nestjs/common';
import { CommentReportsService } from './comment-reports.service';
import { CommentReportsController } from './comment-reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { CommentReportEntity } from './entities/comment-report.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentReportEntity, UserEntity, CommentEntity]),
  ],
  controllers: [CommentReportsController],
  providers: [CommentReportsService],
})
export class CommentReportsModule {}
