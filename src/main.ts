import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = app.get(ConfigService)
  console.log(+config.get<number>('PORT') + 1);

  // const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  //   transport: Transport.TCP,
  //   options: {
  //     host: config.get<string>('HOST'),
  //     port: +config.get<number>('PORT') + 1,
  //     tlsOptions: {
  //       host: config.get<string>('HOST'),
  //       port: +config.get<number>('PORT') + 1
  //     }
  //   }
  // })
  // await microservice.listen()

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: config.get<string>('HOST'),
      port: +config.get<number>('PORT') + 1,
    }
  })

  await app.startAllMicroservices()

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }))

  await app.listen(config.get<number>('PORT'))
}
bootstrap()
