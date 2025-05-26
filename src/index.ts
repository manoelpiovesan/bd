import 'reflect-metadata';
import {createExpressServer, useContainer} from 'routing-controllers';
import {Container} from 'typedi';
import {EmployeeController} from './controllers/employee_controller';
import {setupDatabase} from './db/connection';
import {setupSwagger} from './swagger';

const PORT = process.env.PORT || 3000;


/**
 * Função principal para iniciar o servidor
 * @returns {Promise<void>}
 */
async function main(): Promise<void> {
    useContainer(Container);
    await setupDatabase();

    const app = createExpressServer({
        controllers: [EmployeeController],
    });

    setupSwagger(app);

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

main().then(r => console.log('Application started successfully'));

