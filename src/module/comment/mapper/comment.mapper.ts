import { Board } from "../../board/entity/board.entity";
import { User } from "../../user/entity/user.entity";
import { CommentCreateResponseDto } from "../dto/comment-create-response.dto";
import { CommentCreateDto } from "../dto/comment-create.dto";
import { Comment } from "../entity/comment.entity";

export class CommentMapper{
    DtoToEntity({content}:CommentCreateDto, creator: User, board: Board): Comment{
        const comment = new Comment();
        comment.content = content;
        comment.creator = creator;
        comment.board = board;

        return comment;
    }

    EntityToDto(comment: Comment): CommentCreateResponseDto{
        return {
            content: comment.content,
            creatorId: comment.creator.id,
            boardId: comment.board.id
        }
    }
}