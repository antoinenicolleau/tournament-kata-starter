import {Body, Controller, Param, Post, UseFilters} from '@nestjs/common';
import {ParticipantUsecase} from '../../application/participant/participant-usecase';
import {ParticipantToCreateDto} from './participant.dto';
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
