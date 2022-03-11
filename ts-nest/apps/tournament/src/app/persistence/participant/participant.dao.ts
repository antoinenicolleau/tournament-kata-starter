import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {TournamentDao} from "../tournament/tournament.dao";

@Entity()
export class ParticipantDao {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    elo: number;

    @ManyToOne(type => TournamentDao, tournament => tournament.participants)
    tournament: TournamentDao

}

export class ParticipantToAddDao {
    name: string;
    elo: number;

    constructor(name: string, elo: number) {
        this.name = name;
        this.elo = elo;
    }
}
