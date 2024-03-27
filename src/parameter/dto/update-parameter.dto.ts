import { PartialType } from '@nestjs/mapped-types'
import { CreateParameterDto } from './create-parameter.dto'
import { IsPositive, IsInt } from 'class-validator'

export class UpdateParameterDto extends PartialType(CreateParameterDto) {
    @IsInt()
    @IsPositive()
    id: number
}
