import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {ParticipantDao, ParticipantToAddDao} from "./participant.dao"
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class ParticipantRepositoryService {
    constructor(
        @InjectRepository(ParticipantDao)
        private database: Repository<ParticipantDao>
    ) {
    }

    // public async getParticipants(): Promise<ParticipantDao[]> {
    //     return this.database.find()
    // }
    //

    public async insert(participant: ParticipantToAddDao): Promise<ParticipantDao> {
        return await this.database.save(participant);
    }

    // public async removeParticipant(id: string): Promise<void> {
    //     await this.database.delete(id);
    // }
}
