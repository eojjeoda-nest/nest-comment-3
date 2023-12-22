import { IsNumber } from 'class-validator';

export class PostDto {
  @IsNumber()
  id: number;
}
