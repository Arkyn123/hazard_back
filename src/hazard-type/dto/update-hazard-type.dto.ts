import { PartialType } from '@nestjs/mapped-types'
import { CreateHazardTypeDto } from './create-hazard-type.dto'
import { IsInt, IsPositive } from 'class-validator'

export class UpdateHazardTypeDto extends PartialType(CreateHazardTypeDto) {
    @IsInt()
    @IsPositive()
    id: number
}
