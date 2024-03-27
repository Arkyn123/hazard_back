import { Injectable } from '@nestjs/common'
import { CreateParameterDto } from './dto/create-parameter.dto'
import { UpdateParameterDto } from './dto/update-parameter.dto'
import { ParameterRepository } from './parameter.repository'
import { AsyncLocalStorage } from 'async_hooks'

@Injectable()
export class ParameterService {
  constructor(
    private readonly parameter: ParameterRepository,
  ) { }

  create(createParameterDto: CreateParameterDto) {

    createParameterDto.hazard = { connect: { id: createParameterDto.hazard_id } }
    delete createParameterDto.hazard_id

    return this.parameter.create(createParameterDto)
  }

  findAll() {
    return this.parameter.findAll()
  }

  findOne(id: number) {
    return this.parameter.findOne(id)
  }

  update(updateParameterDto: UpdateParameterDto) {
    const { id, ...data } = updateParameterDto
    return this.parameter.update(id, data)
  }

  remove(id: number) {
    return this.parameter.remove(id)
  }
}
