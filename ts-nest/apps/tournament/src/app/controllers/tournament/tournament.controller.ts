import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ITournament} from '../../api-model';
import {TOURNAMENT_DOESNT_EXIST} from '../../exceptions/errors-messages';
import {generateException, TournamentDoesntExistException} from '../../exceptions/exception-manager';
import {TournamentUsecase} from "../../application/tournament/tournament-usecase";
import {TournamentToCreateDto} from "./tournament.dto";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

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
    public get(@Param('id') id: string): ITournament {
        const tournament = this.tournamentRepository.getTournament(id);
        if (tournament === undefined) {
            throw new TournamentDoesntExistException;
        }
        return tournament;
    }
}
