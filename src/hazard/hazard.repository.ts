import { ConflictException, Inject, Injectable, NotFoundException, forwardRef } from "@nestjs/common"
import { DatabaseHazard } from "src/database/database.service"
import { Prisma } from '@prisma/postgres/hazard'
import { HazardTypeRepository } from "src/hazard-type/hazard-type.repository"

@Injectable()
export class HazardRepository {
    constructor(
        private readonly database: DatabaseHazard,
        @Inject(forwardRef(() => HazardTypeRepository)) private hazard_type: HazardTypeRepository,
    ) { }

    private readonly hazard = this.database.client.hazard

    private async checkConflict(name: string) {
        const hazard = await this.hazard.findFirst({ where: { name } })
        if (hazard) throw new ConflictException('Опасность с таким именем уже создана!')
    }

    async create(data: Prisma.hazardCreateInput) {
        await this.hazard_type.findOne(data.hazard_type.connect.id)
        await this.checkConflict(data.name)
        return await this.hazard.create({ data })
    }

    async removeMany(data: number[]) {
        return await this.hazard.deleteMany({ where: { id: { in: data } } })
    }

    async findAll() {
        return await this.hazard.findMany({
            select: {
                id: true,
                name: true,
                probability: true,
                severity: true,
                ps: true,
                type_id: true,
                parameters: {
                    select: {
                        id: true,
                        name: true,
                        comment: true,
                        measurements: true
                    }
                },
                substances: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
    }

    async findOne(id: number) {
        const hazard = await this.hazard.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                probability: true,
                severity: true,
                ps: true,
                type_id: true,
                parameters: {
                    select: {
                        id: true,
                        name: true,
                        comment: true,
                        measurements: true
                    }
                },
                substances: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })

        if (!hazard) throw new NotFoundException('Опасность не найдена!')
        return hazard
    }

    async update(id: number, data: Prisma.hazardUpdateInput) {
        const hazard = await this.findOne(id)
        await this.hazard_type.findOne(data.hazard_type.connect.id)

        if (data.probability != null || data.severity != null) {
            const probability = data.probability as number
            const severity = data.severity as number

            if (probability == 0 || severity == 0) data.ps = 0
            else {
                data.ps = (probability || hazard.probability) * (severity || hazard.severity)
            }
        }
        return await this.hazard.update({ where: { id }, data })
    }

    async remove(id: number) {
        await this.findOne(id)
        return await this.hazard.delete({ where: { id } })
    }
}
