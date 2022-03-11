import {TournamentDto} from "../tournament/tournament.dto";
import {ParseIntPipe} from "@nestjs/common";
import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {Participant, ParticipantToAdd} from "../../application/participant/participant";

export class ParticipantToCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    elo: number;

    public toParticipantToCreate():ParticipantToAdd{
        return new ParticipantToAdd(this.name, this.elo)
    }
}

export class ParticipantDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    elo: number;

    tournament: TournamentDto;
}
