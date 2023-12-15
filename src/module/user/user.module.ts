import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserMapper } from './mapper/user.mapper';
import { UserController } from './user.controller';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserService, UserMapper],
    controllers:[UserController]
})
export class UserModule {}
