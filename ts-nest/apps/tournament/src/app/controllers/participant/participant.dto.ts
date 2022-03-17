import {IsNotEmpty, IsNumber, IsString} from 'class-validator';
import {ParticipantToAdd} from "../../application/participant/participant";

export class ParticipantToCreateDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    elo: number;

    public toParticipantToCreate(): ParticipantToAdd {
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


    constructor(id: string, name: string, elo: number) {
        this.id = id;
        this.name = name;
        this.elo = elo;
    }
}
