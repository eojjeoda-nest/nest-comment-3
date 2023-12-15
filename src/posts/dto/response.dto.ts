import { IntersectionType, PickType } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CreatePostResponseDto extends IntersectionType(
  PostDto,
  PickType(UserDto, ['userId']),
) {}
