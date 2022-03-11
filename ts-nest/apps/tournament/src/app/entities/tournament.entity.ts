import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {ParticipantEntity} from "./participant.entity";

@Entity()
export class TournamentEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phase: string[];

    @OneToMany(type => ParticipantEntity, participant => participant.tournament)
    participants: ParticipantEntity[]
}






