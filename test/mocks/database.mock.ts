import { Prisma } from "@prisma/postgres/hazard"
import { hazard, hazard_type } from '@prisma/postgres/hazard'

const hazards: hazard[] = []

const hazard_types: hazard_type[] = [{
  createdBy: 184184,
  updatedBy: 184184,
  deletedBy: null,
  id: 1,
  name: 'Test',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
}]

export const mockDatabase = {
  client: {
    hazard: {
      findFirst: jest.fn((data: { where: { name: string } }) => hazards.find(el => el.name == data.where.name)),

      create: jest.fn((dto: { data: Prisma.hazardCreateInput }) => {
        const { data } = dto

        const hazard = {
          createdBy: 184184,
          updatedBy: 184184,
          deletedBy: null,
          id: Date.now(),
          name: data.name,
          probability: data.probability,
          severity: data.severity,
          ps: data.ps,
          type_id: data.hazard_type.connect.id,
          usedInQs: data.usedInQs,
          question: data.question,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }

        hazards.push(hazard)
        return hazard
      }),

      findMany: jest.fn(() => hazards.filter(el => el.deletedAt == null && el.deletedBy == null)),

      findUnique: jest.fn((data: { where: { id: number } }) => hazards.find(el => el.id == data.where.id && el.deletedAt == null && el.deletedBy == null)),

      update: jest.fn((data: { where: { id: number }, data: hazard }) => {
        const hazard = hazards.find(el => el.id == data.where.id)
        const index = hazards.findIndex(el => el.id == data.where.id)
        const updatedHazard = { ...hazard, ...data.data, updatedBy: 194698, updatedAt: new Date() }

        delete updatedHazard['hazard_type']
        hazards[index] = updatedHazard

        return updatedHazard
      }),

      delete: jest.fn((data: { where: { id: number } }) => {
        const hazard = hazards.find(el => el.id == data.where.id)
        const index = hazards.findIndex(el => el.id == data.where.id)

        const deteledHazard = { ...hazard, deletedBy: 194698, deletedAt: new Date() }
        hazards[index] = deteledHazard

        return deteledHazard
      })
    },
    hazard_type: {
      findUnique: jest.fn((data: { where: { id: number } }) => hazard_types.find(el => el.id == data.where.id))
    }
  }
}