import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DatabaseHazard } from 'src/database/database.service'
import { mockDatabase } from './mocks/database.mock'
import { createMock } from '@golevelup/ts-jest'
import { ParameterController } from 'src/parameter/parameter.controller'
import { ParameterService } from 'src/parameter/parameter.service'
import { ParameterRepository } from 'src/parameter/parameter.repository'
import { createdParameter, mockParameter } from './mocks/parameter.mock'

describe('Parameter (e2e)', () => {
    let app: INestApplication
    let id: number

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [ParameterController],
            providers: [ParameterService, ParameterRepository, DatabaseHazard],
        })
            .overrideProvider(DatabaseHazard).useValue(mockDatabase)
            .useMocker(createMock)
            .compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })

    describe('POST /parameter Создание парамерта', () => {
        it('Должно создать новый параметр', () =>
            request(app.getHttpServer())
                .post('/parameter')
                .send(mockParameter)
                .expect(201)
                .expect(res => {
                    id = res.body.id
                    expect(res.body).toEqual(createdParameter)
                }))

        it('Должно вернуть конфликт', async () =>
            request(app.getHttpServer())
                .post('/parameter')
                .send(mockParameter)
                .expect(409)
                .expect(res => expect(res.body.message).toBe('Параметр с таким именем уже создан!')))
    })

    describe('GET /parameter Получение параметров', () => {
        it('Должно вернуть все параметры', () =>
            request(app.getHttpServer())
                .get('/parameter')
                .expect(200)
                .expect(res => expect(res.body).toBeInstanceOf(Array)))

        it('Должно вернуть все параметры', () =>
            request(app.getHttpServer())
                .get('/parameter/' + id)
                .expect(200)
                .expect(res => expect(res.body).toEqual(createdParameter)))

        it('Должно вернуть ошибку из-за отсутствия параметра', () =>
            request(app.getHttpServer())
                .get('/parameter/' + id + 1)
                .expect(404)
                .expect(res => expect(res.body.message).toBe('Параметр не найден!')))
    })

   
})
