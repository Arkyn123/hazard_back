import { Module, forwardRef } from '@nestjs/common'
import { HazardTypeService } from './hazard-type.service'
import { HazardTypeController } from './hazard-type.controller'
import { AlsModule } from 'src/als/als.module'
import { HazardTypeRepository } from './hazard-type.repository'
import { HazardModule } from 'src/hazard/hazard.module'

@Module({
  imports: [forwardRef(() => HazardModule), AlsModule],
  controllers: [HazardTypeController],
  providers: [HazardTypeService, HazardTypeRepository],
  exports: [HazardTypeRepository]
})
export class HazardTypeModule { }
