import { UserCreateResponseDto } from "../dto/user-create-response.dto";
import { UserCreateDto } from "../dto/user-create.dto";
import { User } from "../entity/user.entity";

export class UserMapper{
    DtoToEntity({nickname}:UserCreateDto):User{
        const user = new User();
        user.nickname = nickname;

        return user;
    }
    EntityToDto(user: User):UserCreateResponseDto{
        return {
            id: user.id,
            nickname: user.nickname
        }
    }
}