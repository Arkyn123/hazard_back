import { Inject, Injectable } from '@nestjs/common'
import { CreateHazardDto } from './dto/create-hazard.dto'
import { UpdateHazardDto } from './dto/update-hazard.dto'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { ConfigService } from '@nestjs/config'
import { HazardRepository } from './hazard.repository'

@Injectable()
export class HazardService {
  constructor(
    private readonly hazard: HazardRepository
  ) { }

  async create(createHazardDto: CreateHazardDto) {
    createHazardDto.ps = createHazardDto.probability * createHazardDto.severity
    createHazardDto.hazard_type = { connect: { id: createHazardDto.type_id } }
    delete createHazardDto.type_id

    return await this.hazard.create(createHazardDto)
  }

  async findAll() {
    return await this.hazard.findAll()
  }

  async findOne(id: number) {
    return await this.hazard.findOne(id)
  }

  async update(updateHazardDto: UpdateHazardDto) {
    const { id, ...data } = updateHazardDto
    return await this.hazard.update(id, data)
  }

  async remove(id: number) {
    return await this.hazard.remove(id)
  }

  async removeMany(ids: number[]) {
    return await this.hazard.removeMany(ids)
  }
}
