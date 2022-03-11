import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {IParticipant, ParticipantToAdd} from '../../api-model';
import {
    PARTICIPANT_DOESNT_EXIST,
    PARTICIPANT_ELO_MUST_BE_A_NUMBER,
    PARTICIPANT_NAME_ALREADY_EXIST,
    PARTICIPANT_REQUIRE_ELO,
    PARTICIPANT_REQUIRE_NAME,
    TOURNAMENT_DOESNT_EXIST
} from '../../exceptions/errors-messages';
import {generateException} from '../../exceptions/exception-manager';
import {ParticipantRepositoryService} from "../../repositories/participant-repository.service";
import {TournamentRepositoryService} from "../../repositories/tournament-repository.service";


@Controller('tournaments/:tournamentId/participants')
export class ParticipantController {
    constructor(private participantRepository: ParticipantRepositoryService, private tournamentRepository: TournamentRepositoryService) {
    }

    @Post()
    public async addParticipantToTournament(@Param('tournamentId') tournamentId: string, @Body() participantToAdd: ParticipantToAdd): Promise<{
        id: string;
    }> {
        if (!participantToAdd.name) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_REQUIRE_NAME);
        }
        if (!participantToAdd.elo) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_REQUIRE_ELO);
        }
        if (!Number(participantToAdd.elo)) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_ELO_MUST_BE_A_NUMBER);
        }
        this.participantRepository.getParticipants()?.forEach((value) => {
            if (value.name === participantToAdd.name) {
                throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_NAME_ALREADY_EXIST);
            }
        })


        await this.participantRepository.saveParticipant(participantToAdd)
        const participantSaved = await this.participantRepository.getParticipantByName(participantToAdd.name)

        this.tournamentRepository.addParticipant(this.tournamentRepository.getTournament(tournamentId), participantSaved)

        return {id: participantSaved.id};
    }

    @Get(':participantId')
    public getParticipant(@Param('tournamentId') tournamentId: string, @Param('participantId') participantId: string): IParticipant {
        const tournament = this.tournamentRepository.getTournament(tournamentId)
        if (tournament === undefined) {
            throw generateException(HttpStatus.NOT_FOUND, TOURNAMENT_DOESNT_EXIST);
        }
        let foundParticipant = null;

        tournament.participants.forEach((value) => {
            if (value.id.toString() === participantId) {
                foundParticipant = value
            }
        })
        if (foundParticipant) {
            return foundParticipant
        }
        throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_DOESNT_EXIST);

    }
}
