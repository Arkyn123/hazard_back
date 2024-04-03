import { Module } from '@nestjs/common'
import { SubstanceService } from './substance.service'
import { SubstanceController } from './substance.controller'
import { SubstanceRepository } from './substance.repository'

@Module({
  controllers: [SubstanceController],
  providers: [SubstanceService, SubstanceRepository],
})
export class SubstanceModule { }
