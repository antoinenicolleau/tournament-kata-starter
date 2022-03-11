import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {ParticipantDao} from "../participant/participant.dao";

@Entity()
export class TournamentDao {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    phases: string[];

    @OneToMany(type => ParticipantDao, participant => participant.tournament)
    participants: ParticipantDao[]

    constructor(id: string, name: string, phases: string[], participants: ParticipantDao[]) {
        this.id = id;
        this.name = name
        this.phases = phases
        this.participants = participants
    }
}

export class TournamentToAddDao {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}







