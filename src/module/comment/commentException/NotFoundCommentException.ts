import { HttpStatus } from "@nestjs/common";
import { CustomException } from "../../../global/exception/customException";
import { ErrorCode } from "../../../global/exception/errorCode/Errorcode";

export class NotFoundCommentException extends CustomException{
    constructor() {
        super(
            ErrorCode.BOARD_NOT_FOUND,
            '해당 댓글을 찾을 수 없습니다',
            HttpStatus.NOT_FOUND,
        );
    }
}