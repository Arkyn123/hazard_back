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

  create({ hazard_id, ...data }: CreateParameterDto) {
    data.hazard = { connect: { id: hazard_id } }

    return this.parameter.create(data)
  }

  findAll() {
    return this.parameter.findAll()
  }

  findOne(id: number) {
    return this.parameter.findOne(id)
  }

  update({ id, ...data }: UpdateParameterDto) {
    return this.parameter.update(id, data)
  }

  remove(id: number) {
    return this.parameter.remove(id)
  }
}
