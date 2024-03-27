import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubstanceService } from './substance.service';
import { CreateSubstanceDto } from './dto/create-substance.dto';
import { UpdateSubstanceDto } from './dto/update-substance.dto';

@Controller('substance')
export class SubstanceController {
  constructor(private readonly substanceService: SubstanceService) {}

  @Post()
  create(@Body() createSubstanceDto: CreateSubstanceDto) {
    return this.substanceService.create(createSubstanceDto);
  }

  @Get()
  findAll() {
    return this.substanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.substanceService.findOne(+id);
  }

  @Patch()
  update( @Body() updateSubstanceDto: UpdateSubstanceDto) {
    return this.substanceService.update( updateSubstanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.substanceService.remove(+id);
  }
}
