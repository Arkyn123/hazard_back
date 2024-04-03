import { PartialType } from '@nestjs/mapped-types'
import { CreateSubstanceDto } from './create-substance.dto'

export class UpdateSubstanceDto extends PartialType(CreateSubstanceDto) {}
