import { IsBoolean, IsEmpty, IsInt, IsPositive, IsString } from "class-validator"

export class CreateHazardDto {
    @IsString()
    name: string

    @IsBoolean()
    usedInQs: boolean

    @IsString()
    question: string

    @IsInt()
    @IsPositive()
    probability: number

    @IsInt()
    @IsPositive()
    severity: number

    @IsEmpty()
    ps: number

    @IsInt()
    @IsPositive()
    type_id: number

    @IsEmpty()
    hazard_type: any
}
