import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { BoardController } from './module/board/board.controller';
import { UserController } from './module/user/user.controller';
import { UserModule } from './module/user/user.module';
import { BoardModule } from './module/board/board.module';
import { CommentService } from './module/comment/comment.service';
import { CommentModule } from './module/comment/comment.module';
import { User } from './module/user/entity/user.entity';
import { Board } from './module/board/entity/board.entity';
import { Comment } from './module/comment/entity/comment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          synchronize: process.env.DB_SYNC === 'true',
          entities: [User, Board, Comment],
          timezone: 'Z',
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    UserModule,
    BoardModule,
    CommentModule,
  ]
})
export class AppModule {}
