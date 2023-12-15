import { HttpStatus } from "@nestjs/common";
import { CustomException } from "../../../global/exception/customException";
import { ErrorCode } from "../../../global/exception/errorCode/Errorcode";

export class UserLikesAlreadyException extends CustomException {
    constructor() {
        super(
            ErrorCode.COMMENT_LIKES_ALREDY_PUSH,
            '이미 좋아요를 누르셨습니다!',
            HttpStatus.CONFLICT,
        );
    }
}