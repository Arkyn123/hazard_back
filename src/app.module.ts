import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HazardTypeModule } from './hazard-type/hazard-type.module'
import { HazardModule } from './hazard/hazard.module'
import { CacheModule } from '@nestjs/cache-manager'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './database/database.module'
import { ParameterModule } from './parameter/parameter.module'
import { SubstanceModule } from './substance/substance.module'
import { AlsModule } from './als/als.module'
import { AlsMiddleware } from './als/als.middleware'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    HazardTypeModule,
    HazardModule,
    AuthModule,
    DatabaseModule,
    ParameterModule,
    SubstanceModule,
    AlsModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AlsMiddleware)
      .exclude('/auth/login')
      .forRoutes('*')
  }
}
