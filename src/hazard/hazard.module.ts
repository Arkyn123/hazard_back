import { Module, forwardRef } from '@nestjs/common'
import { HazardService } from './hazard.service'
import { HazardController } from './hazard.controller'
import { AlsModule } from 'src/als/als.module'
import { HazardRepository } from './hazard.repository'
import { HazardTypeModule } from 'src/hazard-type/hazard-type.module'

@Module({
  imports: [forwardRef(() => HazardTypeModule), AlsModule],
  controllers: [HazardController],
  providers: [HazardService, HazardRepository],
  exports: [HazardRepository]
})
export class HazardModule { }
