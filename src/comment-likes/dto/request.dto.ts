import { PickType } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

export class CreateCommentLikeRequestDto extends PickType(UserDto, [
  'primaryUserId',
]) {}
