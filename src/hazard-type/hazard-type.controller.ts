import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { HazardTypeService } from './hazard-type.service'
import { CreateHazardTypeDto } from './dto/create-hazard-type.dto'
import { UpdateHazardTypeDto } from './dto/update-hazard-type.dto'
import { MessagePattern } from '@nestjs/microservices'

@Controller('hazard-type')
export class HazardTypeController {
  constructor(private readonly hazardTypeService: HazardTypeService) { }

  @Post()
  create(@Body() createHazardTypeDto: CreateHazardTypeDto,) {
    return this.hazardTypeService.create(createHazardTypeDto)
  }

  @MessagePattern({ msg: "types" })
  @Get()
  findAll(hazards = true) {
    if (hazards) return this.hazardTypeService.findAll()
    return this.hazardTypeService.findTypes()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hazardTypeService.findOne(id)
  }

  @Patch()
  update(@Body() updateHazardTypeDto: UpdateHazardTypeDto) {
    return this.hazardTypeService.update(updateHazardTypeDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hazardTypeService.remove(id)
  }
}
