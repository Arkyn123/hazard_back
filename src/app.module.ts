import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HazardTypeModule } from './hazard-type/hazard-type.module'
import { HazardModule } from './hazard/hazard.module'
import { CacheModule } from '@nestjs/cache-manager'
import { AuthModule } from './auth/auth.module'
import { AlsMiddleware } from './als/als.middleware'
import { AlsModule } from './als/als.module'
import { DatabaseModule } from './database/database.module'

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
    AlsModule,
    DatabaseModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AlsMiddleware)
      .exclude('/auth/login')
      .forRoutes('*')
  }
}


