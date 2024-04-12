import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { createdHazard, deletedHazard, mockHazard, mockHazard2, mockHazard3, mockUpdateHazard, mockUpdateHazard2, mockUpdateHazard3, updatedHazard } from './mocks/hazard.mock'
import { DatabaseHazard } from 'src/database/database.service'
import { mockDatabase } from './mocks/database.mock'
import { createMock } from '@golevelup/ts-jest'
import { HazardController } from 'src/hazard/hazard.controller'
import { HazardService } from 'src/hazard/hazard.service'
import { HazardRepository } from 'src/hazard/hazard.repository'
import { HazardTypeRepository } from 'src/hazard-type/hazard-type.repository'

describe('Hazard (e2e)', () => {
  let app: INestApplication
  let id: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HazardController],
      providers: [HazardService, HazardRepository, DatabaseHazard, HazardTypeRepository],
    })
      .overrideProvider(DatabaseHazard).useValue(mockDatabase)
      .useMocker(createMock)
      .compile()

    app = moduleFixture.createNestApplication()
    const service = app.get(HazardService)
    
    await app.init()
  })

  describe('POST /hazard Создание опасностей', () => {
    it('Должно создать новую опасность', () =>
      request(app.getHttpServer())
        .post('/hazard')
        .send(mockHazard)
        .expect(201)
        .expect(res => {
          id = res.body.id
          expect(res.body).toEqual(createdHazard)
        }))

    it('Должно вернуть конфликт', async () =>
      request(app.getHttpServer())
        .post('/hazard')
        .send(mockHazard)
        .expect(409)
        .expect(res => expect(res.body.message).toBe('Опасность с таким именем уже создана!')))

    it('Должно вернуть ошибку из-за отсутствия вопроса', async () =>
      request(app.getHttpServer())
        .post('/hazard')
        .send(mockHazard2)
        .expect(400)
        .expect(res => expect(res.body.message).toBe('Введите вопрос')))

    it('Должно вернуть ошибку из-за отсутствия вида', async () =>
      request(app.getHttpServer())
        .post('/hazard')
        .send(mockHazard3)
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Вид опасности не найден!')))
  })

  describe('GET /hazard Получение опасностей', () => {
    it('Должно вернуть все опасности', async () =>
      request(app.getHttpServer())
        .get('/hazard')
        .expect(200)
        .expect(res => expect(res.body).toBeInstanceOf(Array)))

    it('Должно вернуть одну опасность', async () =>
      request(app.getHttpServer())
        .get('/hazard/' + id)
        .expect(200)
        .expect(res => expect(res.body).toEqual(createdHazard)))

    it('Должно вернуть ошибку из-за отсутствия опасности', async () => {
      return request(app.getHttpServer())
        .get('/hazard/' + id + 1)
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Опасность не найдена!'))
    })
  })

  describe('PATCH /hazard Изменении опасности', () => {
    it('Должно изменить опасность', async () => {
      return request(app.getHttpServer())
        .patch('/hazard')
        .send({ ...mockUpdateHazard, id })
        .expect(200)
        .expect(res => expect(res.body).toEqual(updatedHazard))
    })

    it('Должно вернуть ошибку из-за отсутствия опасности', async () =>
      request(app.getHttpServer())
        .patch('/hazard')
        .send({ ...mockUpdateHazard, id: id + 1 })
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Опасность не найдена!')))

    it('Должно вернуть ошибку из-за отсутствия вопроса', async () => {
      return request(app.getHttpServer())
        .patch('/hazard')
        .send({ ...mockUpdateHazard2, id })
        .expect(400)
        .expect(res => expect(res.body.message).toBe('Введите вопрос'))
    })

    it('Должно вернуть ошибку из-за отсутствия вида', async () => {
      return request(app.getHttpServer())
        .patch('/hazard')
        .send({ ...mockUpdateHazard3, id })
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Вид опасности не найден!'))
    })
  })

  describe('DELETE /hazard Удаление опасности', () => {
    it('Должно удалить опасность', async () =>
      request(app.getHttpServer())
        .delete('/hazard/' + id)
        .expect(200)
        .expect(res => expect(res.body).toEqual(deletedHazard)))

    it('Должно вернуть ошибку из-за отсутствия опасности', async () =>
      request(app.getHttpServer())
        .delete('/hazard/' + id)
        .expect(404)
        .expect(res => expect(res.body.message).toBe('Опасность не найдена!')))
  })
})
