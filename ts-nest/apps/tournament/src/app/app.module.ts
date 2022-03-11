import {Module} from '@nestjs/common';
import {PingController} from './controllers/ping/ping.controller';
import {TournamentController} from './controllers/tournament/tournament.controller';
import {TournamentRepositoryService} from './persistence/tournament/tournament-repository.service';
import {ParticipantController} from "./controllers/participant/participant.controller";
import {ParticipantRepositoryService} from "./persistence/participant/participant-repository.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParticipantDao} from "./persistence/participant/participant.dao";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'idk',
        password: 'Jesus123',
        database: 'tournament',
        entities: [
            ParticipantDao
        ],
        synchronize: true,
    }),
        TypeOrmModule.forFeature([ParticipantDao])],
    controllers: [PingController, TournamentController, ParticipantController],
    providers: [TournamentRepositoryService, ParticipantRepositoryService],
})
export class AppModule {
}
