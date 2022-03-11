import {ParticipantToAddDao} from "../../persistence/participant/participant.dao";
import {Tournament} from "../tournament/tournament";


export interface Participant {
    id: string;
    name: string;
    elo: number;
}

export class ParticipantToAdd {
    name: string;
    elo: number;
    tournamentId: string;

    constructor(name, elo, tournamentId) {
        this.name = name;
        this.elo = elo;
        this.tournamentId = tournamentId
    }

    public toParticipantToAddDao(): ParticipantToAddDao {
        return new ParticipantToAddDao(this.name, this.elo)
    }
}
