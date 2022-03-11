import {Injectable} from '@nestjs/common';
import {IParticipant, ParticipantToAdd, ITournament, TournamentToAdd} from '../api-model';
import {InjectRepository} from "@nestjs/typeorm";
import {ParticipantEntity} from "../entities/participant.entity";
import {Repository} from "typeorm";
import {TournamentEntity} from "../entities/tournament.entity";

@Injectable()
export class TournamentRepositoryService {
    constructor(
        @InjectRepository(ParticipantEntity)
        private tournamentsRepository: Repository<TournamentEntity>
    ) {
    }

    public async getTournaments(): Promise<TournamentEntity[]> {
        return await this.tournamentsRepository.find()
    }

    public async getTournamentByName(tournamentId: string): Promise<TournamentEntity> {
        return await this.tournamentsRepository.findOne(tournamentId);
    }

    public async saveTournament(tournament: TournamentToAdd): Promise<void> {
        await this.tournamentsRepository.save(tournament);
    }

    public async addParticipant(tournament: ITournament, participant: IParticipant): Promise<void> {
        const tournament = await this.getTournamentByName("toto")
        this.tournamentsRepository.update(tournament)

        await tournament.participants.save(participant)
    }
}

