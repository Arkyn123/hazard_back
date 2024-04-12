import { CreateHazardTypeDto } from "src/hazard-type/dto/create-hazard-type.dto"
import { UpdateHazardTypeDto } from "src/hazard-type/dto/update-hazard-type.dto"


export const mockType = {
    name: 'Type'
} as CreateHazardTypeDto

export const mockUpdateType = {
    name: 'TypeUpdate'
} as UpdateHazardTypeDto

const mockDefault = {
    createdAt: expect.any(String),
    createdBy: expect.any(Number),
    deletedAt: null,
    deletedBy: null,
    id: expect.any(Number),
    updatedAt: expect.any(String),
    updatedBy: expect.any(Number),
    hazards: expect.any(Array)
}

export const createdType = {
    ...mockDefault,
    name: mockType.name,
}

export const updatedType = {
    ...mockDefault,
    name: mockUpdateType.name
}

export const deletedType = {
    ...mockDefault,
    deletedAt: expect.any(String),
    deletedBy: expect.any(Number),
    name: updatedType.name,
}