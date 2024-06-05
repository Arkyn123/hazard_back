import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateHazardDto } from './dto/create-hazard.dto'
import { UpdateHazardDto } from './dto/update-hazard.dto'
import { HazardRepository } from './hazard.repository'
import { Prisma } from '@prisma/postgres/hazard'

@Injectable()
export class HazardService {
  constructor(
    private readonly hazard: HazardRepository
  ) { }

  async create({ type_id, ...data }: CreateHazardDto) {
    if (data.usedInQs && !data.question) throw new BadRequestException('Введите вопрос')
    if (!data.usedInQs) data.question = ""

    data.ps = data.probability * data.severity
    data.hazard_type = { connect: { id: type_id } }

    return await this.hazard.create(data as Prisma.hazardCreateInput)
  }

  async findAll() {
    return await this.hazard.findAll()
  }

  async findOne(id: number) {
    return await this.hazard.findOne(id)
  }

  async update({ id, type_id, ...data }: UpdateHazardDto) {

    if (data.usedInQs && !data.question) throw new BadRequestException('Введите вопрос')
    if (!data.usedInQs) data.question = ""

    data.hazard_type = { connect: { id: type_id } }

    return await this.hazard.update(id, data)
  }

  async remove(id: number) {
    return await this.hazard.remove(id)
  }

  async removeMany(ids: number[]) {
    return await this.hazard.removeMany(ids)
  }
}
