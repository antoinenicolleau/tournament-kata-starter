import {Injectable} from '@nestjs/common';
import {Participant, ParticipantToAdd} from "../participant/participant";
import {TournamentRepositoryService} from "../../persistence/tournament/tournament-repository.service";
import {Tournament, TournamentToAdd} from './tournament';
import {TournamentDao} from "../../persistence/tournament/tournament.dao";
import {ParticipantNameAlreadyExistException} from "../../exceptions/exception-manager";


@Injectable()
export class TournamentUsecase {

    constructor(private tournamentRepositoryService: TournamentRepositoryService) {
    }

    public async create(tournamentToAdd: TournamentToAdd): Promise<string> {
        //TODO verification métier

        const newTournament = await this.tournamentRepositoryService.insert(tournamentToAdd.toTournamentToAddDao());
        return newTournament.id
    }

    public async addParticipant(tournament: Tournament, newParticipant: Participant): Promise<void> {
        await this.tournamentRepositoryService.update(tournament, {participants: newParticipant})
    }

    public async get(tournamentId: string): Promise<Tournament> {
        return await this.tournamentRepositoryService.get(tournamentId)
    }
}

1
