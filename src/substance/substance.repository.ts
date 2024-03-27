import { ConflictException, Injectable } from "@nestjs/common"
import { AsyncLocalStorage } from "async_hooks"
import { DatabaseHazard } from "src/database/database.service"
import { Prisma } from '@prisma/postgres/hazard'


@Injectable()
export class SubstanceRepository {
    constructor(
        private readonly database: DatabaseHazard
    ) { }

    private readonly substance = this.database.client.substance

    async checkConflict(name: string, hazard_id: number) {
        const substance = await this.substance.findFirst({ where: { hazard_id, name } })
        if (substance) throw new ConflictException('Вещество с таким именем уже создано!')
    }

    async create(data: Prisma.substanceCreateInput) {
        await this.checkConflict(data.name, data.hazard.connect.id)

        return await this.substance.create({ data })
    }

    private async findByName(name: string) {

    }

    async removeMany(data: number[]) {

    }

    async findAll() {

    }

    async findOne(id: number) {

    }

    async update(id: number, data: Prisma.substanceUpdateInput) {

    }

    async remove(id: number) {

    }
}
