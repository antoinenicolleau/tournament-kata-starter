import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {ITournament, TournamentToAdd} from '../../api-model';
import {v4 as uuidv4} from 'uuid';
import {TournamentRepositoryService} from '../../repositories/tournament-repository.service';
import {
    TOURNAMENT_DOESNT_EXIST,
    TOURNAMENT_NAME_ALREADY_EXIST,
    TOURNAMENT_REQUIRE_NAME
} from '../../exceptions/errors-messages';
import {generateException} from '../../exceptions/exception-manager';

@Controller('tournaments')
export class TournamentController {
    constructor(private tournamentRepository: TournamentRepositoryService) {
    }

    @Post()
    public createTournament(@Body() tournamentToAdd: TournamentToAdd): {
        id: string;
    } {
        if (tournamentToAdd.name == null) {
            throw generateException(HttpStatus.BAD_REQUEST, TOURNAMENT_REQUIRE_NAME);
        }
        const tournaments = await this.tournamentRepository.getTournaments()
        tournaments.forEach((value) => {
            if (value.name === tournamentToAdd.name) {
                throw generateException(HttpStatus.BAD_REQUEST, TOURNAMENT_NAME_ALREADY_EXIST);
            }
        })
        await this.tournamentRepository.saveTournament(tournamentToAdd)
        const tournamentSaved = await this.tournamentRepository.getTournamentByName(tournamentToAdd.name)
        return {id: tournamentSaved.id};
    }

    @Get(':id')
    public getTournament(@Param('id') id: string): ITournament {
        const tournament = this.tournamentRepository.getTournament(id);
        if (tournament === undefined) {
            throw generateException(HttpStatus.NOT_FOUND, TOURNAMENT_DOESNT_EXIST);
        }
        return tournament;
    }
}
