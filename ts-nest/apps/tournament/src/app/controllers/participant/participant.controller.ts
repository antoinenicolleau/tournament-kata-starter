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
}
