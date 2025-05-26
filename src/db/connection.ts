import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: 'localhost',
    user: 'manoel',
    password: 'manoel',
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
});


/**
 * Função para criar as tabelas do banco de dados
 * @returns {Promise<void>}
 */
export async function setupDatabase(): Promise<void> {
    // Criando a tabela de funcionários se não existir
    await pool.query(`
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )
    `);

    console.log('Database setup complete');
}