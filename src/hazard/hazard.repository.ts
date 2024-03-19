import { ConflictException, Inject, Injectable, NotFoundException, OnApplicationBootstrap, forwardRef } from "@nestjs/common"
import { AsyncLocalStorage } from "async_hooks"
import { DatabaseHazard } from "src/database/database.service"
import { Prisma } from '@prisma/postgres/hazard'
import { defaultHazards } from "./default"
import { HazardTypeRepository } from "src/hazard-type/hazard-type.repository"

@Injectable()
export class HazardRepository implements OnApplicationBootstrap {
    constructor(
        private readonly database: DatabaseHazard,
        @Inject(forwardRef(() => HazardTypeRepository)) private hazard_type: HazardTypeRepository,
        private readonly als: AsyncLocalStorage<any>
    ) { }

    async onApplicationBootstrap() {
        const hazards = await this.findAll()
        if (!hazards.length) return await this.hazard.createMany({ data: defaultHazards.map(el => ({ ...el, ps: el.probability * el.severity })) })
    }

    private readonly hazard = this.database.hazard

    async create(data: Prisma.hazardCreateInput) {
        await this.hazard_type.findOne(data.hazard_type as number)
        const emp = this.als.getStore().emp
        const hazard = await this.findByName(data.name)
        if (hazard) throw new ConflictException('Опасность с таким именем уже создана!')
        return this.hazard.create({ data: { ...data, createdBy: emp, updatedBy: emp } })
    }

    private async findByName(name: string) {
        return await this.database.hazard.findFirst({ where: { name, deletedAt: null, deletedBy: null } })
    }

    async removeMany(data: number[]) {
        const emp = this.als.getStore().emp
        return await this.hazard.updateMany({ data: { deletedBy: emp, deletedAt: new Date() }, where: { id: { in: data } } })
    }

    async findAll() {
        return await this.hazard.findMany({
            where: { deletedAt: null, deletedBy: null },
            select: {
                id: true,
                name: true,
                probability: true,
                severity: true,
                ps: true,
                type_id: true
            }
        })
    }

    async findOne(id: number) {
        const hazard = await this.hazard.findUnique({
            where: { id, deletedAt: null, deletedBy: null },
            select: {
                id: true,
                name: true,
                probability: true,
                severity: true,
                ps: true,
                type_id: true
            }
        })

        if (!hazard) throw new NotFoundException('Опасность не найдена!')
        return hazard
    }

    async update(id: number, data: Prisma.hazardUpdateInput) {
        const hazard = await this.findOne(id)
        const emp = this.als.getStore().emp

        if (data.probability || data.severity) {
            const probability = data.probability as number
            const severity = data.severity as number
            data.ps = (probability || hazard.probability) * (severity || hazard.severity)
        }
        return await this.hazard.update({ where: { id }, data: { ...data, updatedBy: emp } })
    }

    async remove(id: number) {
        await this.findOne(id)
        const emp = this.als.getStore().emp
        return await this.hazard.update({ where: { id }, data: { deletedBy: emp, deletedAt: new Date() } })
    }
}
