import { ConflictException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common"
import { Prisma } from '@prisma/postgres/hazard'
import { DatabaseHazard } from "src/database/database.service"
import { HazardRepository } from "src/hazard/hazard.repository"

@Injectable()
export class HazardTypeRepository {
    constructor(
        private readonly database: DatabaseHazard,
        @Inject(forwardRef(() => HazardRepository)) private hazard: HazardRepository
    ) { }

    private readonly hazard_type = this.database.client.hazard_type

    async create(data: Prisma.hazard_typeCreateInput) {
        const type = await this.findByName(data.name)
        if (type) throw new ConflictException('Вид опасности с таким именем уже создан!')

        return await this.hazard_type.create({ data })
    }


    private async findByName(name: string) {
        return await this.hazard_type.findFirst({ where: { name } })
    }

    async findAll() {
        return await this.hazard_type.findMany({
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
            select: {
                id: true,
                name: true,
                hazards: false
            }
        })
    }

    async findOne(id: number) {
        const type = await this.hazard_type.findUnique({
            where: { id },
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

        return await this.hazard_type.update({ where: { id }, data })
    }

    async remove(id: number) {
        const type = await this.findOne(id)

        return await this.database.$transaction(async () => {
            this.hazard.removeMany(type.hazards.map(h => h.id))
            this.hazard_type.delete({ where: { id } })
        })[1]
    }
}
