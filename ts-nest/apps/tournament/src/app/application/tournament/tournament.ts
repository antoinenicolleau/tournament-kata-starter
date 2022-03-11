import {Participant} from "../participant/participant";
import {TournamentDao} from "../../persistence/tournament/tournament.dao";

export class Tournament {
    id: string;
    name: string;
    phases: string[];
    participants: Participant[];

    public toTournamentDao():TournamentDao{
        return new TournamentDao(this.id, this.name, this.phases, this.participants)
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

