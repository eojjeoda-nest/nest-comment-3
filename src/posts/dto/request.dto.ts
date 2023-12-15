import { IntersectionType, PickType } from '@nestjs/swagger';
import { PostDto } from './post.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class CreatePostRequestDto extends IntersectionType(
  PickType(PostDto, ['title', 'content']),
  PickType(UserDto, ['primaryUserId']),
) {}
