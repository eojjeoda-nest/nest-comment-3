import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentLikesModule } from './comment-likes/comment-likes.module';

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
          entities: ['dist/**/*.entity{.ts,.js}'], // [Item]
          migrations: [__dirname + '/migrations//*{.ts,.js}'],
          migrationsRun: false,
          synchronize: process.env.DB_SYNC === 'true',
          timezone: 'Z',
          // logging: true,
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    CommentsModule,
    UsersModule,
    PostsModule,
    CommentLikesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
