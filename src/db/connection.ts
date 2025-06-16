import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'manoel',
    password: process.env.DB_PASSWORD || 'manoel',
    database: process.env.DB_NAME || 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
});


/**
 * Função para criar as tabelas do banco de dados
 * @returns {Promise<void>}
 */
export async function setupDatabase(): Promise<void> {

    // Criando a tabela de departamentos se não existir
    await pool.query(`
        CREATE TABLE IF NOT EXISTS departments (
           id INT AUTO_INCREMENT PRIMARY KEY,
           name VARCHAR(255) NOT NULL
        )
    `);

    // Criando a tabela de funcionários se não existir
    await pool.query(`
        CREATE TABLE IF NOT EXISTS employees
        (
            id             INT AUTO_INCREMENT PRIMARY KEY,
            name           VARCHAR(255) NOT NULL,
            department_id  INT,
            admission_date DATETIME DEFAULT NOW(),
            dismissal_date DATETIME,
            salary         INT,
            FOREIGN KEY (department_id) REFERENCES departments (id) ON DELETE SET NULL
        )
    `);



    console.log('Database setup complete');
}