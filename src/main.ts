import { configLoader } from './modules/core/helpers/config.helper';
configLoader();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { basicAuthMiddleware } from './modules/core/helpers/security.helper';
import { HttpExceptionFilter } from './modules/core/filters/exception/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    basicAuthMiddleware({ des: process.env.API_DOC_PASS || 'M0ck@P1' }, [
      '/api-docs',
    ]),
  );

  const config = new DocumentBuilder()
    .setTitle('Mock API API')
    .setDescription('Mock API Workshop API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.APP_PORT || 80);
}
bootstrap().catch((err) => console.log(`${err.message}`));
