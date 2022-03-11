import {Injectable} from '@nestjs/common';
import {ParticipantToAdd} from '../api-model';
import {Repository} from 'typeorm';
import {ParticipantEntity} from '../entities/participant.entity'
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
export class ParticipantRepositoryService {
    constructor(
        @InjectRepository(ParticipantEntity)
        private participantsRepository: Repository<ParticipantEntity>
    ) {}

    public async getParticipants(): Promise<ParticipantEntity[]> {
        return this.participantsRepository.find()
    }

    public async getParticipantByName(name: string): Promise<ParticipantEntity> {
        return this.participantsRepository.findOne({where: {name: name}});
    }

    public async saveParticipant(participant: ParticipantToAdd): Promise<void> {
        await this.participantsRepository.save(participant);
    }

    public async removeParticipant(id: string): Promise<void> {
        await this.participantsRepository.delete(id);
    }
}
