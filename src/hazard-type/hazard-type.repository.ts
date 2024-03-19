import { ConflictException, Inject, Injectable, NotFoundException, OnApplicationBootstrap, OnModuleInit, forwardRef } from "@nestjs/common"
import { Prisma } from '@prisma/postgres/hazard'
import { AsyncLocalStorage } from "async_hooks"
import { DatabaseHazard } from "src/database/database.service"
import { defaultTypes } from "./default"
import { HazardRepository } from "src/hazard/hazard.repository"

@Injectable()
export class HazardTypeRepository implements OnApplicationBootstrap {
    constructor(
        private readonly database: DatabaseHazard,
        @Inject(forwardRef(() => HazardRepository)) private hazard: HazardRepository,
        private readonly als: AsyncLocalStorage<any>,
    ) { }

    async onApplicationBootstrap() {
        const types = await this.findAll()
        if (!types.length) await this.createMany(defaultTypes)
    }

    private readonly hazard_type = this.database.hazard_type

    async create(data: Prisma.hazard_typeCreateInput) {
        const type = await this.findByName(data.name)
        if (type) throw new ConflictException('Вид опасности с таким именем уже создан!')

        const emp = this.als.getStore().emp
        return await this.hazard_type.create({ data: { ...data, createdBy: emp, updatedBy: emp } })
    }

    async createMany(data: Prisma.hazard_typeCreateInput[]) {
        return await this.hazard_type.createMany({ data })
    }

    private async findByName(name: string) {
        return await this.hazard_type.findFirst({ where: { name, deletedAt: null, deletedBy: null } })
    }

    async findAll() {
        return await this.hazard_type.findMany({
            where: { deletedAt: null, deletedBy: null },
            select: {
                id: true,
                name: true,
                hazards: {
                    select: {
                        id: true,
                        name: true,
                        probability: true,
                        severity: true,
                        ps: true,
                        type_id: true
                    }, where: { deletedAt: null, deletedBy: null }
                }
            }
        })
    }

    async findTypes() {
        return await this.hazard_type.findMany({
            where: { deletedAt: null, deletedBy: null },
            select: {
                id: true,
                name: true,
                hazards: false
            }
        })
    }

    async findOne(id: number) {
        const type = await this.hazard_type.findUnique({
            where: { id, deletedAt: null, deletedBy: null },
            select: {
                id: true,
                name: true,
                hazards: {
                    select: {
                        id: true,
                        name: true,
                        probability: true,
                        severity: true,
                        ps: true,
                        type_id: true
                    }, where: { deletedAt: null, deletedBy: null }
                }
            }
        })
        if (!type) throw new NotFoundException('Вид опасности не найден')
        return type
    }

    async update(id: number, data: Prisma.hazard_typeUpdateInput) {
        await this.findOne(id)
        const emp = this.als.getStore().emp
        return await this.hazard_type.update({ where: { id }, data: { ...data, updatedBy: emp } })
    }

    async remove(id: number) {
        const type = await this.findOne(id)
        const emp = this.als.getStore().emp
        return await this.database.$transaction(async () => {
            this.hazard.removeMany(type.hazards.map(h => h.id));
            this.hazard_type.update({ where: { id }, data: { deletedBy: emp, deletedAt: new Date() } });
        })[1]
    }
}
