import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { HazardService } from './hazard.service'
import { CreateHazardDto } from './dto/create-hazard.dto'
import { UpdateHazardDto } from './dto/update-hazard.dto'

@Controller('hazard')
export class HazardController {
  constructor(private readonly hazardService: HazardService) { }

  @Post()
  create(@Body() createHazardDto: CreateHazardDto) {
    return this.hazardService.create(createHazardDto)
  }

  @Get()
  findAll() {
    return this.hazardService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hazardService.findOne(id)
  }

  @Patch()
  update(@Body() updateHazardDto: UpdateHazardDto) {
    return this.hazardService.update(updateHazardDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hazardService.remove(id)
  }
}
