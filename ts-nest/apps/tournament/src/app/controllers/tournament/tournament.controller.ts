import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {TournamentUsecase} from "../../application/tournament/tournament-usecase";
import {TournamentDto, TournamentToCreateDto} from "./tournament.dto";
import {IsNotEmpty, IsString} from "class-validator";
import {ParticipantDto} from "../participant/participant.dto";

@Controller('tournaments')
export class TournamentController {
    constructor(private tournamentUsecase: TournamentUsecase) {
    }

    @Post()
    public async create(@Body() tournamentToCreateDto: TournamentToCreateDto): Promise<{
        id: string;
    }> {
        const tournamentId = await this.tournamentUsecase.create(tournamentToCreateDto.toTournamentToCreate())

        return {id: tournamentId};
    }

    @Get(':id')
    @IsString()
    @IsNotEmpty()
    public async get(@Param('id') id: string): Promise<TournamentDto> {
        const tournament = await this.tournamentUsecase.get(id);
        const participants = []
        for (const participant of tournament.participants) {
            participants.push(new ParticipantDto(participant.id, participant.name, participant.elo))
        }

        return tournament;
    }
}
