import { CreateParameterDto } from "src/parameter/dto/create-parameter.dto"


export const mockParameter = {
    hazard_id: 1,
    name: 'Test',
    comment: 'TestComment',
    measurements: 3
} as CreateParameterDto

// export const mockHazard2 = {
//     name: 'Hazard2',
//     probability: 2,
//     severity: 2,
//     usedInQs: true,
//     question: null,
//     type_id: 1
// } as CreateHazardDto

// export const mockHazard3 = {
//     name: 'Hazard2',
//     probability: 2,
//     severity: 2,
//     usedInQs: true,
//     question: 'Question',
//     type_id: 2
// } as CreateHazardDto

// export const mockUpdateHazard = {
//     name: 'HazardUpdate',
//     probability: 4,
//     severity: 4,
//     usedInQs: true,
//     question: 'HazardUpdate',
//     type_id: 1
// } as UpdateHazardDto

// export const mockUpdateHazard2 = {
//     name: 'HazardUpdate',
//     probability: 4,
//     severity: 4,
//     usedInQs: true,
//     question: null,
//     type_id: 1
// } as UpdateHazardDto

// export const mockUpdateHazard3 = {
//     name: 'HazardUpdate',
//     probability: 4,
//     severity: 4,
//     usedInQs: true,
//     question: 'HazardUpdate',
//     type_id: 2
// } as UpdateHazardDto

const mockDefault = {
    createdAt: expect.any(String),
    createdBy: expect.any(Number),
    deletedAt: null,
    deletedBy: null,
    id: expect.any(Number),
    updatedAt: expect.any(String),
    updatedBy: expect.any(Number),
}

export const createdParameter = {
    ...mockDefault,
    hazard_id: mockParameter.hazard_id,
    name: mockParameter.name,
    comment: mockParameter.comment,
    measurements: mockParameter.measurements
}

// export const updatedHazard = {
//     ...mockDefault,
//     name: mockUpdateHazard.name,
//     probability: mockUpdateHazard.probability,
//     ps: mockUpdateHazard.probability * mockUpdateHazard.severity,
//     severity: mockUpdateHazard.severity,
//     question: mockUpdateHazard.usedInQs ? mockUpdateHazard.question : '',
//     type_id: mockUpdateHazard.type_id,
// }

// export const deletedHazard = {
//     ...mockDefault,
//     deletedAt: expect.any(String),
//     deletedBy: expect.any(Number),
//     name: mockUpdateHazard.name,
//     probability: mockUpdateHazard.probability,
//     ps: mockUpdateHazard.probability * mockUpdateHazard.severity,
//     severity: mockUpdateHazard.severity,
//     question: mockUpdateHazard.usedInQs ? mockUpdateHazard.question : '',
//     type_id: mockUpdateHazard.type_id,
// }