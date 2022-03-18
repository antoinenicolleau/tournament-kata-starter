import {Body, Controller, Get, Param, Post, UseFilters} from '@nestjs/common';
import {ParticipantUsecase} from '../../application/participant/participant-usecase';
import {ParticipantDto, ParticipantToCreateDto} from './participant.dto';
import {HttpExceptionFilter} from '../../exceptions/http-exception.filter';
import {IsNotEmpty, IsString} from "class-validator";

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

    @Get(':id')
    @IsString()
    @IsNotEmpty()
    public async get(@Param('id') id: string): Promise<ParticipantDto> {
        const participant = await this.participantUsecase.get(id);
        return new ParticipantDto(participant.id, participant.name, participant.elo);
    }

    @Get()
    public async getAll(): Promise<ParticipantDto[]> {
        const participants = await this.participantUsecase.getAll();
        const participantsDto = [];
        for (const participant of participants) {
            participantsDto.push(new ParticipantDto(participant.id, participant.name, participant.elo))
        }
        return participantsDto;
    }
}
