import {Module} from '@nestjs/common';
import {PingController} from './controllers/ping/ping.controller';
import {TournamentController} from './controllers/tournament/tournament.controller';
import {TournamentRepositoryService} from './repositories/tournament-repository.service';
import {ParticipantController} from "./controllers/participant/participant.controller";
import {ParticipantRepositoryService} from "./repositories/participant-repository.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParticipantEntity} from "./entities/participant.entity";

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'antoine',
        password: 'antoine',
        database: 'tournament',
        entities: [
            ParticipantEntity
        ],
        synchronize: true,
    }),
        TypeOrmModule.forFeature([ParticipantEntity])],
    controllers: [PingController, TournamentController, ParticipantController],
    providers: [TournamentRepositoryService, ParticipantRepositoryService],
})
export class AppModule {
}
