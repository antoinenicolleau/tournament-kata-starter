import {Injectable} from '@nestjs/common';
import {Participant, ParticipantToAdd} from './participant';
import {ParticipantRepositoryService} from "../../persistence/participant/participant-repository.service";
import {TournamentUsecase} from "../tournament/tournament-usecase";
import {ParticipantNameAlreadyExistException} from "../../exceptions/exception-manager";


@Injectable()
export class ParticipantUsecase {

    constructor(private participantRepositoryService: ParticipantRepositoryService, private tournamentUsecase: TournamentUsecase) {
    }

    public async addToTournament(tournamentId: string, participantToAdd: ParticipantToAdd): Promise<string> {
        const tournament = await this.tournamentUsecase.get(tournamentId)
        tournament.participants.forEach((participant) => {
            if (participant.name === newParticipant.name) {
                throw new ParticipantNameAlreadyExistException();
            }
        })

        const newParticipantDao = await this.participantRepositoryService.insert(participantToAdd.toParticipantToAddDao());
        const newParticipant = new Participant(newParticipantDao.id, newParticipantDao.name, newParticipantDao.elo)
        await this.tournamentUsecase.addParticipant(tournament, newParticipant)
        return newParticipant.id
    }
}
