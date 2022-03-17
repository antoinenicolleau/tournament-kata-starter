import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TournamentDao, TournamentToAddDao} from "./tournament.dao";
import {ParticipantDao, ParticipantToAddDao} from "../participant/participant.dao";
import {TournamentDto} from "../../controllers/tournament/tournament.dto";


@Injectable()
export class TournamentRepositoryService {
    constructor(
        @InjectRepository(TournamentDao)
        private database: Repository<TournamentDao>
    ) {
    }

    public async get(id): Promise<TournamentDao> {
        return this.database.findOne(id);
    }

    public async update(tournament: TournamentDao, update: unknown): Promise<void> {
        await this.database.update(tournament, update)
    }

    public async insert(tournament: TournamentToAddDao): Promise<TournamentDao> {
        console.log("tournamentDAO", tournament)
        return await this.database.save(tournament);
    }

    // public async getTournaments(): Promise<TournamentDao[]> {
    //     return await this.tournamentsRepository.find()
    // }
    //
    // public async getTournamentByName(tournamentId: string): Promise<TournamentDao> {
    //     return await this.tournamentsRepository.findOne(tournamentId);
    // }
    //
    // public async saveTournament(tournament: TournamentToAdd): Promise<void> {
    //     await this.tournamentsRepository.save(tournament);
    // }
    //
    // public async addParticipant(tournament: ITournament, participant: IParticipant): Promise<void> {
    //     const tournament = await this.getTournamentByName("toto")
    //     this.tournamentsRepository.update(tournament)
    //
    //     await tournament.participants.save(participant)
    // }
}

