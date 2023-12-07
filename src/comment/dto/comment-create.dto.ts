import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CommentCreateDto {
  @IsNumber()
  readonly postId: number;

  // 일반 댓글의 경우 parentId 없음
  @IsOptional()
  @IsNumber()
  readonly parentId?: number;

  @IsString()
  @IsNotEmpty() //null, undefined, 공백 불허
  @MinLength(1, {
    message: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.',
  })
  @MaxLength(20, {
    message: '댓글 작성자는 최소 1자 이상 20자 이하로 작성해야합니다.',
  })
  author: string;

  @IsString()
  @IsNotEmpty() //null, undefined, 공백 불허
  @MinLength(1, {
    message: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.',
  })
  @MaxLength(1000, {
    message: '댓글은 최소 1자 이상 1000자 이하로 작성해야합니다.',
  })
  content: string;
}
