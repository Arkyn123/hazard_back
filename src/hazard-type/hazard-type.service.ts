import { Injectable } from '@nestjs/common'
import { CreateHazardTypeDto } from './dto/create-hazard-type.dto'
import { UpdateHazardTypeDto } from './dto/update-hazard-type.dto'
import { HazardTypeRepository } from './hazard-type.repository'

@Injectable()
export class HazardTypeService {
  constructor(
    private readonly hazard_type: HazardTypeRepository
  ) { }


  async create(createHazardTypeDto: CreateHazardTypeDto) {
    return await this.hazard_type.create(createHazardTypeDto)
  }

  async findAll() {
    return await this.hazard_type.findAll()
  }

  async findTypes() {
    return await this.hazard_type.findTypes()

  }

  async findOne(id: number) {
    return await this.hazard_type.findOne(id)

  }

  async update(updateHazardTypeDto: UpdateHazardTypeDto) {
    const { id, ...updateData } = updateHazardTypeDto
    return await this.hazard_type.update(updateHazardTypeDto.id, updateData)
  }

  async remove(id: number) {
    return await this.hazard_type.remove(id)
  }
}
