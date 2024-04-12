import { Prisma } from "@prisma/postgres/hazard"
import { hazard, hazard_type } from '@prisma/postgres/hazard'

const hazards: hazard[] = []

const hazard_types: hazard_type[] = [{
  createdBy: 184184,
  updatedBy: 184184,
  deletedBy: null,
  id: 1,
  name: 'TestForHazard',
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

        const deletedHazard = { ...hazard, deletedBy: 194698, deletedAt: new Date() }
        hazards[index] = deletedHazard

        return deletedHazard
      }),

      deleteMany: jest.fn()
    },
    hazard_type: {
      findFirst: jest.fn((data: { where: { name: string } }) => {
        const type = hazard_types.find(el => el.name == data.where.name && el.deletedAt == null && el.deletedBy == null)
        if (!type) return

        const haz = hazards.filter(el => el.name == data.where.name)
        return { ...type, hazards: haz }
      }),

      create: jest.fn((dto: { data: Prisma.hazardCreateInput }) => {
        const { data } = dto

        const type = {
          createdBy: 184184,
          updatedBy: 184184,
          deletedBy: null,
          id: Date.now(),
          name: data.name,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
        }
        const haz = hazards.filter(el => el.id == type.id)
        hazard_types.push(type)
        return { ...type, hazards: haz }
      }),

      findMany: jest.fn(() => hazard_types.filter(el => el.deletedAt == null && el.deletedBy == null)),

      findUnique: jest.fn((data: { where: { id: number } }) => {
        const type = hazard_types.find(el => el.id == data.where.id && el.deletedAt == null && el.deletedBy == null)
        if (!type) return

        const haz = hazards.filter(el => el.id == data.where.id)
        return { ...type, hazards: haz }
      }),

      update: jest.fn((data: { where: { id: number }, data: hazard_type }) => {
        const type = hazard_types.find(el => el.id == data.where.id)
        if (!type) return

        const haz = hazards.filter(el => el.id == data.where.id)
        const index = hazard_types.findIndex(el => el.id == data.where.id)
        const updatedType = { ...type, ...data.data, updatedBy: 194698, updatedAt: new Date() }

        hazard_types[index] = updatedType

        return { ...updatedType, hazards: haz }
      }),


      delete: jest.fn((data: { where: { id: number } }) => {
        const type = hazard_types.find(el => el.id == data.where.id)
        const index = hazard_types.findIndex(el => el.id == data.where.id)

        const deletedType = { ...type, deletedBy: 194698, deletedAt: new Date() }
        hazard_types[index] = deletedType

        return deletedType
      })
    }
  },
  $transaction: jest.fn(async func => await func())
}