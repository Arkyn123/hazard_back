import { PrismaClient } from '@prisma/postgres/hazard'
import { defaultHazards } from './hazard.default'
import { defaultTypes } from './types.default'

const prisma = new PrismaClient()

const main = async () => {
    try {
        const types = await prisma.hazard_type.findMany()
        if (!types.length) await prisma.hazard_type.createMany({ data: defaultTypes })
        const hazards = await prisma.hazard.findMany()
        if (!hazards.length) await prisma.hazard.createMany({ data: defaultHazards.map(el => ({ ...el, ps: el.probability * el.severity })) })
    }
    catch (error) {
        throw error
    }
}

main().catch((err) => {
    console.warn("Error While generating Seed: \n", err);
});