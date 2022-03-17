import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {ParticipantDao} from "../participant/participant.dao";

@Entity()
export class TournamentDao {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(type => ParticipantDao, participant => participant.tournament)
    participants: ParticipantDao[]

    constructor(id: string, name: string, participants: ParticipantDao[]) {
        this.id = id;
        this.name = name
        this.participants = participants
    }
}

export class TournamentToAddDao {
    name: string;
    participants: ParticipantDao[];

    constructor(name: string) {
        this.name = name;
        this.participants = [];
    }
}







