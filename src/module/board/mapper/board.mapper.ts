import { User } from "../../user/entity/user.entity";
import { BoardCreateReponseDto } from "../dto/board-create-response.dto";
import { BoardCreateDto } from "../dto/board-create.dto";
import { Board } from "../entity/board.entity";

export class BoardMapper{
    DtoToEntity({content}:BoardCreateDto, creator: User): Board{
        const board = new Board();
        board.content = content;
        board.creator = creator;

        return board;
    }

    EntityToDto(board: Board): BoardCreateReponseDto{
        return {
            creatorId: board.creator.id,
            content: board.content
        }
    }
}