import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { DatabaseHazard } from 'src/database/database.service'
import { mockDatabase } from './mocks/database.mock'
import { createMock } from '@golevelup/ts-jest'
import { HazardTypeRepository } from 'src/hazard-type/hazard-type.repository'
import { HazardTypeController } from 'src/hazard-type/hazard-type.controller'
import { HazardTypeService } from 'src/hazard-type/hazard-type.service'
import { createdType, mockType, mockUpdateType, updatedType } from './mocks/hazard-type.mock'
import { HazardRepository } from 'src/hazard/hazard.repository'

describe('HazardType (e2e)', () => {
  let app: INestApplication
  let id: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HazardTypeController],
      providers: [HazardTypeService, HazardTypeRepository, DatabaseHazard, HazardRepository],
    })
      .overrideProvider(DatabaseHazard).useValue(mockDatabase)
      .useMocker(createMock)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  describe('POST /hazard-type Создание видов', () => {
    it('Должно создать новый вид', () =>
      request(app.getHttpServer())
        .post('/hazard-type')
        .send(mockType)
        .expect(res => {
          id = res.body.id
          expect(res.body).toEqual(createdType)
        }))

    it('Должно вернуть конфликт', async () =>
      request(app.getHttpServer())
        .post('/hazard-type')
        .send(mockType)
        .expect(409)
        .expect(res => expect(res.body.message).toBe('Вид опасности с таким именем уже создан!')))
  })

  describe('GET /hazard-type Получение видов', () => {
    it('Должно вернуть все виды', async () =>
      request(app.getHttpServer())
        .get('/hazard-type')
        .expect(200)
        .expect(res => expect(res.body).toBeInstanceOf(Array)))

    it('Должно вернуть один вид', async () =>
      request(app.getHttpServer())
        .get('/hazard-type/' + id)
        .expect(200)
        .expect(res => expect(res.body).toEqual(createdType)))

    it('Должно вернуть ошибку из-за отсутствия вида', async () =>
      request(app.getHttpServer())
        .get('/hazard-type/' + id + 1)
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Вид опасности не найден!')))
  })

  describe('PATCH /hazard-type Изменении вида', () => {
    it('Должно изменить вид', async () =>
      request(app.getHttpServer())
        .patch('/hazard-type')
        .send({ ...mockUpdateType, id })
        .expect(200)
        .expect(res => expect(res.body).toEqual(updatedType)))

    it('Должно вернуть ошибку из-за отсутствия вида', async () =>
      request(app.getHttpServer())
        .patch('/hazard-type')
        .send({ ...mockUpdateType, id: id + 1 })
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Вид опасности не найден!')))
  })

  describe('DELETE /hazard-type Удаление вида', () => {
    it('Должно удалить вид', async () =>
      request(app.getHttpServer())
        .delete('/hazard-type/' + id)
        .expect(200))

    it('Должно вернуть ошибку из-за отсутствия вида', async () => {
      return request(app.getHttpServer())
        .delete('/hazard-type/' + id)
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Вид опасности не найден!'))
    })
  })
})
