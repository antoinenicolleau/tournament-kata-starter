import {Injectable} from '@nestjs/common';
import {Participant, Tournament} from '../api-model';

@Injectable()
export class TournamentRepositoryService {
    private tournaments = new Map<string, Tournament>();

    public saveTournament(tournament: Tournament): void {
        this.tournaments.set(tournament.id, tournament);
    }

    public getTournament(tournamentId: string): Tournament {
        return this.tournaments.get(tournamentId);
    }

    public getTournaments(): Map<string, Tournament> {
        return this.tournaments
    }

    public addParticipant(tournament: Tournament, participant: Participant): void {
        tournament.participants.push(participant)
    }
}
