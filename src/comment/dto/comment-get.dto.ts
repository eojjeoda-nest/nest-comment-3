import { PageRequest } from '../../common/dto/page-request.dto';
import { IsOptional, IsString } from 'class-validator';

export class CommentGetDto extends PageRequest {
  @IsString()
  @IsOptional()
  id?: number;
}
