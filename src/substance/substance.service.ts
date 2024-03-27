import { Injectable } from '@nestjs/common';
import { CreateSubstanceDto } from './dto/create-substance.dto';
import { UpdateSubstanceDto } from './dto/update-substance.dto';
import { SubstanceRepository } from './substance.repository';

@Injectable()
export class SubstanceService {
  constructor(
    private readonly substance: SubstanceRepository
  ) { }

  create(createSubstanceDto: CreateSubstanceDto) {
    createSubstanceDto.hazard = { connect: { id: createSubstanceDto.hazard_id } }
    delete createSubstanceDto.hazard_id

    return this.substance.create(createSubstanceDto)
  }

  findAll() {
    return `This action returns all substance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} substance`;
  }

  update(updateSubstanceDto: UpdateSubstanceDto) {
    return
  }

  remove(id: number) {
    return `This action removes a #${id} substance`;
  }
}
