import { IsEmpty, IsInt, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateParameterDto {
    @IsInt()
    @IsPositive()
    hazard_id: number

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    comment: string

    @IsInt()
    @IsPositive()
    measurements: number

    @IsEmpty()
    hazard: any
}
