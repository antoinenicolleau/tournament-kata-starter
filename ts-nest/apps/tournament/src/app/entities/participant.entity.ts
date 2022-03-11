import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TournamentEntity} from "./tournament.entity";

@Entity()
export class ParticipantEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    elo: number;

    @ManyToOne(type => TournamentEntity, tournament => tournament.participants)
    tournament: TournamentEntity;
}
