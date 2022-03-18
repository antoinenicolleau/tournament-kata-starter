import {Injectable} from '@nestjs/common';
import {Participant} from "../participant/participant";
import {TournamentRepositoryService} from "../../persistence/tournament/tournament-repository.service";
import {Tournament, TournamentToAdd} from './tournament';
import {TournamentDoesntExistException} from "../../exceptions/exception-manager";
import {ParticipantRepositoryService} from "../../persistence/participant/participant-repository.service";


@Injectable()
export class TournamentUsecase {

    constructor(private tournamentRepositoryService: TournamentRepositoryService, private participantRepositoryService: ParticipantRepositoryService) {
    }

    public async create(tournamentToAdd: TournamentToAdd): Promise<string> {
        const newTournament = await this.tournamentRepositoryService.insert(tournamentToAdd.toTournamentToAddDao());
        return newTournament.id
    }

    public async addParticipant(tournament: Tournament, newParticipant: Participant): Promise<void> {
        await this.tournamentRepositoryService.update(tournament.toTournamentDao(), {participants: newParticipant})
    }

    public async get(tournamentId: string): Promise<Tournament> {
        const tournamentDao = await this.tournamentRepositoryService.get(tournamentId)
        if (tournamentDao === undefined) {
            throw new TournamentDoesntExistException()
        }
        const participants = []
        if (tournamentDao.participants) {
            for (const participantId in tournamentDao.participants) {
                const participantDao = await this.participantRepositoryService.get(participantId)
                participants.push(new Participant(participantDao.id, participantDao.name, participantDao.elo))
            }
        }
        return new Tournament(tournamentDao.id, tournamentDao.name, participants)
    }
}

