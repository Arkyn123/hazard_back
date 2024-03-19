import { Global, Module } from '@nestjs/common'
import { DatabaseHazard } from './database.service'

@Global()
@Module({
    providers: [DatabaseHazard],
    exports: [DatabaseHazard]
})
export class DatabaseModule { }
