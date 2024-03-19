import { IsString } from "class-validator"

export class CreateHazardTypeDto {
    @IsString()
    name: string
}
