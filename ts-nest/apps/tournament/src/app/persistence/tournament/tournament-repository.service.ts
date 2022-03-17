import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {TournamentDao, TournamentToAddDao} from "./tournament.dao";


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
}

