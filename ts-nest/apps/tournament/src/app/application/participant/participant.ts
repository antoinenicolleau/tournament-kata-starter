import {ParticipantDao, ParticipantToAddDao} from "../../persistence/participant/participant.dao";


export class Participant {
    id: string;
    name: string;
    elo: number;

    public toParticipantDao(): ParticipantDao {
        return new ParticipantDao(this.id, this.name, this.elo)
    }

    constructor(id: string, name: string, elo: number) {
        this.id = id;
        this.name = name;
        this.elo = elo;
    }
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
