import {Injectable} from '@nestjs/common';
import {Participant} from '../api-model';

@Injectable()
export class ParticipantRepositoryService {
    private participants = new Map<string, Participant>();

    public saveParticipant(participant: Participant): void {
        this.participants.set(participant.id, participant);
    }

    public getParticipant(participantId: string): Participant {
        return this.participants.get(participantId);
    }

    public getParticipants(): Map<string, Participant> {
        return this.participants
    }

}
