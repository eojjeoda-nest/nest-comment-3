export class CommentCreateResponseDto{

    content: string;

    boardId: number;

    depth: number;

    creatorId: number;

    parentId?: number;
}