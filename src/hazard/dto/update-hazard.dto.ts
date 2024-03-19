import { PartialType } from '@nestjs/mapped-types'
import { CreateHazardDto } from './create-hazard.dto'
import { IsInt, IsPositive } from 'class-validator'

export class UpdateHazardDto extends PartialType(CreateHazardDto) {
    @IsInt()
    @IsPositive()
    id: number
}
