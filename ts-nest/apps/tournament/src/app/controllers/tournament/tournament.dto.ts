import {IParticipant, TournamentPhase} from "../../api-model";
import {IsNotEmpty, IsString} from "class-validator";
import {ParticipantToAdd} from "../../application/participant/participant";
import {Tournament, TournamentToAdd} from "../../application/tournament/tournament";

export class TournamentToCreateDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    public toTournamentToCreate():TournamentToAdd{
        return new TournamentToAdd(this.name)
    }
}

export class TournamentDto {
    id: string;
    name: string;
    phases: TournamentPhase[];
    participants: IParticipant[];
}
