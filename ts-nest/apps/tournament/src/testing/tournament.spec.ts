import {INestApplication} from '@nestjs/common';
import {startApp} from './test.utils';
import * as request from 'supertest';

import {
    PARTICIPANT_ELO_MUST_BE_A_NUMBER,
    PARTICIPANT_NAME_ALREADY_EXIST,
    PARTICIPANT_REQUIRE_ELO,
    PARTICIPANT_REQUIRE_NAME,
    TOURNAMENT_DOESNT_EXIST,
    TOURNAMENT_NAME_ALREADY_EXIST,
    TOURNAMENT_REQUIRE_NAME
} from '../app/exceptions/errors-messages';
import {TournamentToCreateDto} from "../app/controllers/tournament/tournament.dto";
import {ParticipantToCreateDto} from "../app/controllers/participant/participant.dto";


function generateExampleTournament() {
    return {
        name: 'Tournament_' + Math.floor(Math.random() * (10000000)),
    } as TournamentToCreateDto;
}

function generateExampleParticipant() {
    return {
        name: 'Participant_' + Math.floor(Math.random() * (10000000)),
        elo: 2500
    } as ParticipantToCreateDto;
}


describe('/tournament endpoint', () => {
    let app: INestApplication;
    let exampleTournament;
    let exampleParticipant;
    beforeAll(async () => {
        app = await startApp();
    });

    beforeEach(() => {
        exampleTournament = generateExampleTournament();
        exampleParticipant = generateExampleParticipant();
    })

    describe('[POST] when creating a tournament', () => {
        it('should return the correct id', async () => {
            const {body} = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            expect(body.id).not.toBeUndefined();
        });

        it('should have stored the tournament', async () => {
            const {body} = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const get = await request(app.getHttpServer())
                .get(`/api/tournaments/${body.id}`)
                .expect(200);

            expect(get.body.name).toEqual(exampleTournament.name);
        });

        it('no name for the tournament', async () => {
            const {body} = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send({})
                .expect(400);

            expect(body.error).toEqual(TOURNAMENT_REQUIRE_NAME);
        });

        it('Name is already used', async () => {
            await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const {body} = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(400);

            expect(body.error).toEqual(TOURNAMENT_NAME_ALREADY_EXIST);
        });

        it('Tournament doesn\'t exist', async () => {
            const get = await request(app.getHttpServer())
                .get(`/api/tournaments/0`)
                .expect(404);
            expect(get.body.error).toEqual(TOURNAMENT_DOESNT_EXIST);
        });

        it('Should have store the participant', async () => {
            const postTournament = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const tournamentId = postTournament.body.id
            const postParticipant = await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(201);

            const participantId = postParticipant.body.id
            const getParticipant = await request(app.getHttpServer())
                .get(`/api/tournaments/${tournamentId}/participants/${participantId}`)
                .expect(200);

            expect(getParticipant.body.name).toEqual(exampleParticipant.name);
        });

        it('Participant name already exist', async () => {
            const postTournament = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const tournamentId = postTournament.body.id
            await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(201);

            const postParticipant = await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(400);

            expect(postParticipant.body.error).toEqual(PARTICIPANT_NAME_ALREADY_EXIST);
        });

        it('Participant name is empty', async () => {
            exampleParticipant.name = '';
            const postTournament = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const tournamentId = postTournament.body.id;
            const postParticipant = await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(400);

            expect(postParticipant.body.error).toEqual(PARTICIPANT_REQUIRE_NAME);
        });

        it('Participant Elo must be a number', async () => {
            exampleParticipant.elo = 'aaa'
            const postTournament = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const tournamentId = postTournament.body.id
            const postParticipant = await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(400);

            expect(postParticipant.body.error).toEqual(PARTICIPANT_ELO_MUST_BE_A_NUMBER);
        });

        it('Participant Elo is empty', async () => {
            exampleParticipant.elo = null
            const postTournament = await request(app.getHttpServer())
                .post('/api/tournaments')
                .send(exampleTournament)
                .expect(201);

            const tournamentId = postTournament.body.id
            const postParticipant = await request(app.getHttpServer())
                .post(`/api/tournaments/${tournamentId}/participants`)
                .send(exampleParticipant)
                .expect(400);

            expect(postParticipant.body.error).toEqual(PARTICIPANT_REQUIRE_ELO);
        });
    });
});
