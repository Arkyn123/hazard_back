import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Transport } from '@nestjs/microservices'
import { ConfigService } from '@nestjs/config'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = app.get(ConfigService)
  const documentConfig = new DocumentBuilder().setTitle('Справочник опасных и вредных факторов').addBearerAuth().addSecurityRequirements('bearer').build()
  const document = SwaggerModule.createDocument(app, documentConfig)

  SwaggerModule.setup('api', app, document)

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

  await app.listen(+config.get<number>('PORT'))
  console.log('Server started on: ' + await app.getUrl());

}
bootstrap()
