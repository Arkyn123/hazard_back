import { Module } from '@nestjs/common'
import { ParameterService } from './parameter.service'
import { ParameterController } from './parameter.controller'
import { ParameterRepository } from './parameter.repository'

@Module({
  controllers: [ParameterController],
  providers: [ParameterService, ParameterRepository],
})
export class ParameterModule { }
