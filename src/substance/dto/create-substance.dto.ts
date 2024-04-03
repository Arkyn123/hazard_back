import { IsEmpty, IsInt, IsPositive, IsString } from "class-validator"

export class CreateSubstanceDto {
    @IsString()
    name: string

    @IsInt()
    @IsPositive()
    hazard_id: number

    @IsEmpty()
    hazard: any
}
