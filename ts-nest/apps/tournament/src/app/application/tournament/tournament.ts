import {Participant} from "../participant/participant";
import {TournamentDao, TournamentToAddDao} from "../../persistence/tournament/tournament.dao";

export class Tournament {
    id: string;
    name: string;
    phases: string[];
    participants: Participant[];

    public toTournamentDao(): TournamentDao {
        const participantsDao = [];
        this.participants.forEach((participant) => {
            participantsDao.push(participant.toParticipantDao())
        })
        return new TournamentDao(this.id, this.name, participantsDao)
    }
}

export class TournamentToAdd {
    name: string;

    constructor(name) {
        this.name = name;
    }

    public toTournamentToAddDao(): TournamentToAddDao {
        return new TournamentToAddDao(this.name)
    }
}

