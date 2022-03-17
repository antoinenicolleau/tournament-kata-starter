import {IsNotEmpty, IsString} from "class-validator";
import {TournamentToAdd} from "../../application/tournament/tournament";
import {ParticipantDto} from "../participant/participant.dto";

export class TournamentToCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    toTournamentToCreate(): TournamentToAdd {
        return new TournamentToAdd(this.name)
    }

    constructor(name) {
        this.name = name;
    }
}

export class TournamentDto {
    id: string;
    name: string;
    participants: ParticipantDto[];
}
