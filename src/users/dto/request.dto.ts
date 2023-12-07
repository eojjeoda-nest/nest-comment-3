import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class CreateUserResquestDto extends PickType(UserDto, [
  'userId',
  'userPw',
]) {}
