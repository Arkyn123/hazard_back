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

  async create(createHazardDto: CreateHazardDto) {
    if (createHazardDto.usedInQs && !createHazardDto.question) throw new BadRequestException('Введите вопрос')
    if (!createHazardDto.usedInQs) createHazardDto.question = ""

    createHazardDto.ps = createHazardDto.probability * createHazardDto.severity
    createHazardDto.hazard_type = { connect: { id: createHazardDto.type_id } }
    delete createHazardDto.type_id

    return await this.hazard.create(createHazardDto as Prisma.hazardCreateInput)
  }

  async findAll() {
    return await this.hazard.findAll()
  }

  async findOne(id: number) {
    return await this.hazard.findOne(id)
  }

  async update(updateHazardDto: UpdateHazardDto) {
    const { id, ...data } = updateHazardDto

    if (data.usedInQs && !data.question) throw new BadRequestException('Введите вопрос')
    if (!data.usedInQs) data.question = ""

    data.hazard_type = { connect: { id: data.type_id } }
    delete data.type_id

    return await this.hazard.update(id, data)
  }

  async remove(id: number) {
    return await this.hazard.remove(id)
  }

  async removeMany(ids: number[]) {
    return await this.hazard.removeMany(ids)
  }
}
