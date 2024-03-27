import { Module, forwardRef } from '@nestjs/common'
import { HazardTypeService } from './hazard-type.service'
import { HazardTypeController } from './hazard-type.controller'
import { HazardTypeRepository } from './hazard-type.repository'
import { HazardModule } from 'src/hazard/hazard.module'

@Module({
  imports: [forwardRef(() => HazardModule)],
  controllers: [HazardTypeController],
  providers: [HazardTypeService, HazardTypeRepository],
  exports: [HazardTypeRepository]
})
export class HazardTypeModule { }
