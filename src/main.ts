import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { version } from '../package.json';

config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Bordeaux Atis')
        .setDescription('Api to create atis')
        .setVersion(version)
        .addApiKey({ name: 'X-API-KEY', type: 'apiKey', in: 'header' }, 'X-API-KEY')
        .build();

    let document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document, {
        customSiteTitle: 'Bordeaux Atis API',
        customfavIcon: 'https://www.bordeaux.aeroport.fr/themes/custom/adbm_theme/favicon.ico',
    });

    await app.listen(parseInt(process.env.PORT));
}

bootstrap();
