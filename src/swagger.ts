import {routingControllersToSpec} from 'routing-controllers-openapi';
import swaggerUi from 'swagger-ui-express';
import {getMetadataArgsStorage} from 'routing-controllers';
import {Application} from 'express';

/**
 * Configura o Swagger para a aplicação Express
 * @param app - Instância da aplicação Express
 */
export function setupSwagger(app: Application): void {
    const swaggerSpec = routingControllersToSpec(
        getMetadataArgsStorage(),
        {},
        {
            info: {
                title: 'Projeto de Sistemas de Banco de Dados',
                version: '1.0.0',
                description: 'Trabalho Final da disciplina de Sistemas de Banco de Dados da UERJ em 2025.1',
            },
        }
    );

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
