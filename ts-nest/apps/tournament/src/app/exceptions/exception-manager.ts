import {HttpException, HttpStatus} from "@nestjs/common";
import {PARTICIPANT_NAME_ALREADY_EXIST, TOURNAMENT_DOESNT_EXIST} from "./errors-messages";

export function generateException(statusCode: number, errorMessage: string): HttpException {

    return new HttpException({
        statusCode: statusCode,
        error: errorMessage,
    }, statusCode)
}

export class ParticipantNameAlreadyExistException extends HttpException{
    constructor() {
        super(PARTICIPANT_NAME_ALREADY_EXIST, HttpStatus.BAD_REQUEST);
    }
}

export class TournamentDoesntExistException extends HttpException{
    constructor() {
        super(TOURNAMENT_DOESNT_EXIST, HttpStatus.BAD_REQUEST);
    }
}


