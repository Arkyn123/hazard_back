import { Inject, Injectable } from '@nestjs/common'
import { CreateHazardTypeDto } from './dto/create-hazard-type.dto'
import { UpdateHazardTypeDto } from './dto/update-hazard-type.dto'
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'
import { ConfigService } from '@nestjs/config'
import { HazardTypeRepository } from './hazard-type.repository'

@Injectable()
export class HazardTypeService {
  constructor(
    private readonly hazard_type: HazardTypeRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly config: ConfigService
  ) { }

  private async reStore() {
    await Promise.all([
      this.cacheManager.del('types'),
      this.cacheManager.del('only_types')
    ])
  }

  async create(createHazardTypeDto: CreateHazardTypeDto) {
    await this.reStore()
    return await this.hazard_type.create(createHazardTypeDto)
  }

  async findAll() {
    return await this.cacheManager.wrap(
      'types',
      async () => await this.hazard_type.findAll(),
      this.config.get('CACHE_TTL')
    )
  }

  async findTypes() {
    return await this.cacheManager.wrap(
      'only_types',
      async () => await this.hazard_type.findTypes(),
      this.config.get('CACHE_TTL')
    )
  }

  async findOne(id: number) {
    return await this.cacheManager.wrap(
      'types' + id,
      async () => await this.hazard_type.findOne(id),
      this.config.get('CACHE_TTL') / 2
    )
  }

  async update(updateHazardTypeDto: UpdateHazardTypeDto) {
    await this.reStore()
    await this.cacheManager.del('types' + updateHazardTypeDto.id)
    const { id, ...updateData } = updateHazardTypeDto
    return await this.hazard_type.update(updateHazardTypeDto.id, updateData)
  }

  async remove(id: number) {
    await this.reStore()
    await this.cacheManager.del('types' + id)
    return await this.hazard_type.remove(id)
  }
}
