import {Module} from '@nestjs/common';
import {PingController} from './controllers/ping/ping.controller';
import {TournamentController} from './controllers/tournament/tournament.controller';
import {TournamentRepositoryService} from './persistence/tournament/tournament-repository.service';
import {ParticipantController} from "./controllers/participant/participant.controller";
import {ParticipantRepositoryService} from "./persistence/participant/participant-repository.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ParticipantDao} from "./persistence/participant/participant.dao";
import {TournamentDao} from "./persistence/tournament/tournament.dao";
import {TournamentUsecase} from "./application/tournament/tournament-usecase";
import {ParticipantUsecase} from "./application/participant/participant-usecase";
import {TournamentDto, TournamentToCreateDto} from "./controllers/tournament/tournament.dto";
import {ParticipantDto, ParticipantToCreateDto} from "./controllers/participant/participant.dto";
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'cours-architecture-db.florianlafuente.com',
        port: 12345,
        username: 'admin',
        password: 'Passw0rd',
        database: 'test',
        entities: [
            ParticipantDao,
            TournamentDao
        ],
        synchronize: true,
    }),
        TypeOrmModule.forFeature([ParticipantDao, TournamentDao])],
    controllers: [PingController, TournamentController, ParticipantController],
    providers: [TournamentRepositoryService, ParticipantRepositoryService, TournamentUsecase, ParticipantUsecase,TournamentDto, ParticipantDto, ParticipantToCreateDto, TournamentToCreateDto]
})
export class AppModule {
}
