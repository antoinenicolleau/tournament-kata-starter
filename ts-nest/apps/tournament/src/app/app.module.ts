import {Module} from '@nestjs/common';
import {PingController} from './controllers/ping/ping.controller';
import {TournamentController} from './controllers/tournament/tournament.controller';
import {TournamentRepositoryService} from './repositories/tournament-repository.service';
import {ParticipantController} from "./controllers/participant/participant.controller";
import {ParticipantRepositoryService} from "./repositories/participant-repository.service";

@Module({
    imports: [],
    controllers: [PingController, TournamentController, ParticipantController],
    providers: [TournamentRepositoryService, ParticipantRepositoryService],
})
export class AppModule {
}
