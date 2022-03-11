export enum TournamentPhaseType {
    SingleBracketElimination = 'SingleBracketElimination',
    SwissRound = 'SwissRound',
}

export interface TournamentPhase {
    type: TournamentPhaseType;
}

export interface IParticipant {
    id: string;
    name: string;
    elo: number;
}


export interface Round {
    name: string;
    matches: Match[];
}

export interface Match {
    participant1: IParticipant;
    participant2: IParticipant;
}
