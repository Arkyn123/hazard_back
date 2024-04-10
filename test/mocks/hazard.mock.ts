import { CreateHazardDto } from "src/hazard/dto/create-hazard.dto"
import { UpdateHazardDto } from "src/hazard/dto/update-hazard.dto"

export const mockHazard = {
    name: 'Test',
    probability: 2,
    severity: 2,
    usedInQs: true,
    question: 'Test',
    type_id: 1
} as CreateHazardDto

export const mockHazard2 = {
    name: 'Test2',
    probability: 2,
    severity: 2,
    usedInQs: true,
    question: null,
    type_id: 1
} as CreateHazardDto

export const mockHazard3 = {
    name: 'Test2',
    probability: 2,
    severity: 2,
    usedInQs: true,
    question: 'Test',
    type_id: 2
} as CreateHazardDto


export const mockUpdateHazard = {
    name: 'TestUpdate',
    probability: 4,
    severity: 4,
    usedInQs: true,
    question: 'TestUpdate',
    type_id: 1
} as UpdateHazardDto

export const mockUpdateHazard2 = {
    name: 'TestUpdate',
    probability: 4,
    severity: 4,
    usedInQs: true,
    question: null,
    type_id: 1
} as UpdateHazardDto

export const mockUpdateHazard3 = {
    name: 'TestUpdate',
    probability: 4,
    severity: 4,
    usedInQs: true,
    question: 'TestUpdate',
    type_id: 2
} as UpdateHazardDto

const mockDefault = {
    createdAt: expect.any(String),
    createdBy: expect.any(Number),
    deletedAt: null,
    deletedBy: null,
    id: expect.any(Number),
    updatedAt: expect.any(String),
    updatedBy: expect.any(Number),
    usedInQs: expect.any(Boolean)
}

export const createdHazard = {
    ...mockDefault,
    name: mockHazard.name,
    probability: mockHazard.probability,
    ps: mockHazard.probability * mockHazard.severity,
    severity: mockHazard.severity,
    question: mockHazard.usedInQs ? mockHazard.question : '',
    type_id: mockHazard.type_id
}

export const updatedHazard = {
    ...mockDefault,
    name: mockUpdateHazard.name,
    probability: mockUpdateHazard.probability,
    ps: mockUpdateHazard.probability * mockUpdateHazard.severity,
    severity: mockUpdateHazard.severity,
    question: mockUpdateHazard.usedInQs ? mockUpdateHazard.question : '',
    type_id: mockUpdateHazard.type_id,
}

export const deletedHazard = {
    ...mockDefault,
    deletedAt: expect.any(String),
    deletedBy: expect.any(Number),
    name: mockUpdateHazard.name,
    probability: mockUpdateHazard.probability,
    ps: mockUpdateHazard.probability * mockUpdateHazard.severity,
    severity: mockUpdateHazard.severity,
    question: mockUpdateHazard.usedInQs ? mockUpdateHazard.question : '',
    type_id: mockUpdateHazard.type_id,
}