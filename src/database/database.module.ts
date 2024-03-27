import { Global, Module } from '@nestjs/common'
import { DatabaseHazard } from './database.service'
import { AlsModule } from 'src/als/als.module'

@Global()
@Module({
    imports: [AlsModule],
    providers: [DatabaseHazard],
    exports: [DatabaseHazard],
})
export class DatabaseModule { }
