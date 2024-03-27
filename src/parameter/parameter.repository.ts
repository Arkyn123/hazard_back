import { ConflictException, Injectable, NotFoundException } from "@nestjs/common"
import { AsyncLocalStorage } from "async_hooks"
import { DatabaseHazard } from "src/database/database.service"
import { Prisma } from '@prisma/postgres/hazard'


@Injectable()
export class ParameterRepository {
    constructor(
        private readonly database: DatabaseHazard
    ) { }

    private readonly parameter = this.database.client.parameter

    async checkConflict(name: string, hazard_id: number) {
        const parameter = await this.parameter.findFirst({ where: { hazard_id, name } })
        if (parameter) throw new ConflictException('Параметр с таким именем уже создан!')
    }

    async create(data: Prisma.parameterCreateInput) {
        await this.checkConflict(data.name, data.hazard.connect.id)

        return await this.parameter.create({ data })
    }

    async removeMany(data: number[]) {

    }

    async findAll() {
        return await this.parameter.findMany({
            select: {
                id: true,
                hazard_id: true,
                name: true,
                comment: true,
                measurements: true
            }
        })
    }

    async findOne(id: number) {
        const parameter = await this.parameter.findUnique({ where: { id } })
        if (!parameter) throw new NotFoundException('Параметр не найден!')
        return parameter
    }

    async update(id: number, data: Prisma.hazardUpdateInput) {
        await this.findOne(id)
        return await this.parameter.update({ where: { id }, data })
    }

    async remove(id: number) {
        await this.findOne(id)
        return await this.parameter.delete({ where: { id } })
    }
}
