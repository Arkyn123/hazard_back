import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DatabaseHazard } from 'src/database/database.service'
import { mockDatabase } from './mocks/database.mock'
import { createMock } from '@golevelup/ts-jest'
import { AppModule } from 'src/app.module'

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiLRgtC10YHRgtC40YDQvtCy0LDQvdC40LUg0YHQtdGA0LLQuNGB0LAiLCJuYW1lIjoi0YfQtdGH0LjQvTE5NDY5OCIsIkZJTyI6ItCn0JXQp9CY0J0g0KHQldCc0JXQnSDQmtCe0J3QodCi0JDQndCi0JjQndCe0JLQmNCnIiwiZW1wIjoxOTQ2OTgsImlhdCI6MTUzODgyODcwNn0.Ucj-M7Dxv_TZ7D3OSwPJxq_Ib4_M-LfOjaqjbVMAlho'

describe('Аутентификация', () => {
    let app: INestApplication

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        })
            .overrideProvider(DatabaseHazard).useValue(mockDatabase)
            .useMocker(createMock)
            .compile()

        app = moduleFixture.createNestApplication()
        await app.init()
    })
    it('Должно разрешить запрос', () =>
        request(app.getHttpServer())
            .get('/hazard')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    )

    it('Должно вернуть ошибку из-за отсутствия токена', () =>
        request(app.getHttpServer())
            .get('/hazard')
            .expect(401)
            .expect(res => expect(res.body.message).toBe('Пользователь не авторизован!'))
    )

    it('Должно вернуть ошибку из-за неверного токена', () =>
        request(app.getHttpServer())
            .get('/hazard')
            .set('Authorization', `Bearer ${token + 1}`)
            .expect(401)
            .expect(res => expect(res.body.message).toBe('Ошибка в декодировании токена!'))
    )
})
