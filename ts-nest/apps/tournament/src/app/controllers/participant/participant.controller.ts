import {Body, Controller, Get, HttpStatus, Param, Post} from '@nestjs/common';
import {Participant, ParticipantToAdd} from '../../api-model';
import {v4 as uuidv4} from 'uuid';
import {
    PARTICIPANT_DOESNT_EXIST,
    PARTICIPANT_ELO_IS_EMPTY,
    PARTICIPANT_ELO_MUST_BE_A_NUMBER,
    PARTICIPANT_NAME_ALREADY_EXIST,
    PARTICIPANT_REQUIRE_NAME,
    TOURNAMENT_DOESNT_EXIST
} from '../../exceptions/errors-messages';
import {generateException} from '../../exceptions/exception-manager';
import {ParticipantRepositoryService} from "../../repositories/participant-repository.service";
import {TournamentRepositoryService} from "../../repositories/tournament-repository.service";

@Controller('tournaments/:tournament_id/participants')
export class ParticipantController {
    constructor(private participantRepository: ParticipantRepositoryService, private tournamentRepository: TournamentRepositoryService) {
    }

    @Post()
    public addParticipantToTournament(@Param('tournament_id') tournament_id: string, @Body() participantToAdd: ParticipantToAdd): {
        id: string;
    } {
        if (participantToAdd.name == null) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_REQUIRE_NAME);
        }
        if (participantToAdd.elo == null) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_ELO_IS_EMPTY);
        }
        if (!Number(participantToAdd.elo)) {
            throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_ELO_MUST_BE_A_NUMBER);
        }
        this.participantRepository.getParticipants()?.forEach((value) => {
            if (value.name === participantToAdd.name) {
                throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_NAME_ALREADY_EXIST);
            }
        })
        const participant = {
            id: uuidv4(),
            name: participantToAdd.name,
            elo: participantToAdd.elo
        };

        this.participantRepository.saveParticipant(participant)
        this.tournamentRepository.addParticipant(this.tournamentRepository.getTournament(tournament_id), participant)

        return {id: participant.id};
    }

    @Get(':participant_id')
    public getParticipant(@Param('tournament_id') tournament_id: string, @Param('participant_id') participant_id: string): Participant {
        const tournament = this.tournamentRepository.getTournament(tournament_id)
        if (tournament === undefined) {
            throw generateException(HttpStatus.NOT_FOUND, TOURNAMENT_DOESNT_EXIST);
        }

        tournament.participants.forEach((value) => {
            if (value.id === participant_id) {
                return participant_id
            }
        })
        throw generateException(HttpStatus.BAD_REQUEST, PARTICIPANT_DOESNT_EXIST);

    }
}
