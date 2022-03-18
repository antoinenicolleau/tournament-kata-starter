import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ParticipantDao, ParticipantToAddDao} from "./participant.dao"
import {InjectRepository} from "@nestjs/typeorm";
import {TournamentDao} from "../tournament/tournament.dao";


@Injectable()
export class ParticipantRepositoryService {
    constructor(
        @InjectRepository(ParticipantDao)
        private database: Repository<ParticipantDao>
    ) {
    }

    public async get(id: string): Promise<ParticipantDao> {
        return this.database.findOne(id);
    }

    public async getAll(): Promise<ParticipantDao[]> {
        return this.database.find();
    }

    public async getFromTournament(id: string): Promise<ParticipantDao[]> {
        return this.database.find({where: {tournament: id}});
    }


    public async insert(participant: ParticipantToAddDao): Promise<ParticipantDao> {
        return await this.database.save(participant);
    }

    public async remove(id: string): Promise<void> {
        await this.database.delete(id);
    }
}
