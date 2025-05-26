import 'reflect-metadata';
import {createExpressServer, useContainer} from 'routing-controllers';
import {Container} from 'typedi';
import {EmployeeController} from './controllers/employee_controller';
import {setupDatabase} from './db/connection';

const PORT = process.env.PORT || 3030;


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

    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

main().then(r => console.log('Application started successfully'));
