import {Injectable} from '@nestjs/common';
import {ParticipantToAdd} from './participant';
import {ParticipantRepositoryService} from "../../persistence/participant/participant-repository.service";
import {TournamentUsecase} from "../tournament/tournament-usecase";
import {ParticipantNameAlreadyExistException} from "../../exceptions/exception-manager";


@Injectable()
export class ParticipantUsecase {

    constructor(private participantRepositoryService: ParticipantRepositoryService, private tournamentUsecase: TournamentUsecase) {
    }
    public async create(tournamentToAdd : TournamentToAdd): Promise<string>{
        //TODO verification métier

    }
    public async addToTournament(tournamentId: string, participantToAdd: ParticipantToAdd): Promise<string> {
        //TODO verification métier
        const tournament = await this.tournamentUsecase.get(tournamentId)
        tournament.participants.forEach((participant) => {
            if (participant.name === newParticipant.name) {
                throw new ParticipantNameAlreadyExistException();
            }
        })

        const newParticipant = await this.participantRepositoryService.insert(participantToAdd.toParticipantToAddDao());
        await this.tournamentUsecase.addParticipant(tournament, newParticipant)
        return newParticipant.id
    }
}
