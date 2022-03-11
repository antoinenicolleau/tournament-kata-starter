import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ParticipantUsecase} from '../../application/participant/participant-usecase';
import {
    PARTICIPANT_DOESNT_EXIST,
    PARTICIPANT_ELO_MUST_BE_A_NUMBER,
    PARTICIPANT_NAME_ALREADY_EXIST,
    PARTICIPANT_REQUIRE_ELO,
    PARTICIPANT_REQUIRE_NAME,
    TOURNAMENT_DOESNT_EXIST
} from '../../exceptions/errors-messages';
import {generateException} from '../../exceptions/exception-manager';
import {ParticipantRepositoryService} from "../../persistence/participant/participant-repository.service";
import {TournamentRepositoryService} from "../../persistence/tournament/tournament-repository.service";
import {ParticipantToCreateDto} from './participant.dto';
import {UseFilters} from '@nestjs/common';
import {HttpExceptionFilter} from '../../exceptions/http-exception.filter';


@Controller('tournaments/:tournamentId/participants')
export class ParticipantController {
    constructor(private participantUsecase: ParticipantUsecase) {
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    public async addToTournament(@Param('tournamentId') tournamentId: string, @Body() participantToCreateDto: ParticipantToCreateDto): Promise<{
        id: string;
    }> {

        const participantId = await this.participantUsecase.addToTournament(tournamentId, participantToCreateDto.toParticipantToCreate())

        return {id: participantId};
    }

    @Get(':participantId')
    public get(@Param('tournamentId') tournamentId: string, @Param('participantId') participantId: string): IParticipant {
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
