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
    private readonly hazard: HazardRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly config: ConfigService
  ) { }

  private async reStore() {
    await this.cacheManager.del('hazards')
  }

  async create(createHazardDto: CreateHazardDto) {
    createHazardDto.ps = createHazardDto.probability * createHazardDto.severity
    createHazardDto.hazard_type = { connect: { id: createHazardDto.type_id } }
    delete createHazardDto.type_id

    await this.reStore()

    return await this.hazard.create(createHazardDto)
  }

  async findAll() {
    return this.cacheManager.wrap(
      'hazards',
      async () => await this.hazard.findAll(),
      this.config.get('CACHE_TTL')
    )
  }

  async findOne(id: number) {
    return this.cacheManager.wrap(
      'hazards' + id,
      async () => await this.hazard.findOne(id),
      this.config.get('CACHE_TTL') / 2
    )
  }

  async update(updateHazardDto: UpdateHazardDto) {
    await this.reStore()
    await this.cacheManager.del('hazards' + updateHazardDto.id)
    const { id, ...data } = updateHazardDto
    return await this.hazard.update(id, data)
  }

  async remove(id: number) {
    await this.reStore()
    await this.cacheManager.del('hazards' + id)
    return await this.hazard.remove(id)
  }

  async removeMany(ids: number[]) {
    await this.reStore()
    ids.map(id => 'hazards' + id).forEach(async key => await this.cacheManager.del(key))
    return await this.hazard.removeMany(ids)
  }
}
