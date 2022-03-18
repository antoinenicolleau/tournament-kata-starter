import {Injectable} from '@nestjs/common';
import {Participant, ParticipantToAdd} from './participant';
import {ParticipantRepositoryService} from "../../persistence/participant/participant-repository.service";
import {TournamentUsecase} from "../tournament/tournament-usecase";
import {
    ParticipantDoesntExistException,
    ParticipantNameAlreadyExistException,
    TournamentDoesntExistException
} from "../../exceptions/exception-manager";
import {Tournament} from "../tournament/tournament";
import {ParticipantDto} from "../../controllers/participant/participant.dto";


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

    public async get(participantId: string): Promise<Participant> {
        const participantDao = await this.participantRepositoryService.get(participantId)
        if (participantDao === undefined) {
            throw new ParticipantDoesntExistException()
        }
        return new Participant(participantDao.id, participantDao.name, participantDao.elo)
    }

    public async getAll(): Promise<Participant[]> {
        const participantsDao = await this.participantRepositoryService.getAll();
        const participants = [];
        for (const participant of participantsDao) {
            participants.push(new Participant(participant.id, participant.name, participant.elo))
        }
        return participants;
    }
}
