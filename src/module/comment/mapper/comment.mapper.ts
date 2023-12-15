import { Board } from "../../board/entity/board.entity";
import { User } from "../../user/entity/user.entity";
import { CommentCreateResponseDto } from "../dto/comment-create-response.dto";
import { CommentCreateDto } from "../dto/comment-create.dto";
import { CommentReplyCreateDto } from "../dto/comment-reply-create.dto";
import { Comment } from "../entity/comment.entity";

export class CommentMapper{
    DtoToEntity({content}:CommentCreateDto, creator: User, board: Board, defaultDepth: number): Comment{
        const comment = new Comment();
        comment.content = content;
        comment.creator = creator;
        comment.board = board;
        comment.depth = defaultDepth;

        return comment;
    }

    EntityToDto(comment: Comment): CommentCreateResponseDto{
        return {
            content: comment.content,
            creatorId: comment.creator?.id,
            boardId: comment.board?.id,
            depth: comment.depth,
            likesCount: comment.likesCount
        }
    }

    ReplyDtoToEntity({content, parentId}:CommentReplyCreateDto, creator: User, board: Board, replyCommentDepth: number): Comment{
        const comment = new Comment();
        comment.content = content;
        comment.creator = creator;
        comment.board = board;
        comment.parentId = parentId;
        comment.depth = replyCommentDepth;

        return comment;
    }

    ReplyEntityToDto(comment: Comment): CommentCreateResponseDto{
        return {
            content: comment.content,
            creatorId: comment.creator.id,
            boardId: comment.board.id,
            depth: comment.depth,
            parentId: comment.parent?.id
        }
    }
}