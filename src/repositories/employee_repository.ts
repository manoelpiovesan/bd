import {Service} from 'typedi';
import {pool} from '../db/connection';
import {Employee} from "../models/employee";


@Service()
export class EmployeeRepository {

    /**
     * Retorna todos os funcionários
     * @return {Promise<Employee[]>}'
     */
    async findAll(): Promise<Employee[]> {
        const [rows] = await pool.query('SELECT * FROM employees');
        return rows as Employee[];
    }

    /**
     * Encontra um funcionário pelo ID
     * @param id - Employee_repository ID
     * @return {Promise<Employee | null>}
     */
    async findById(id: number): Promise<Employee | null> {
        const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [id]);
        const employees = rows as Employee[];
        return employees.length ? employees[0] : null;
    }


    /**
     * Encontra um funcionário pelo nome
     * @param name - Employee_repository name
     * @return {Promise<Employee | null>}
     */
    async create(name: string): Promise<Employee> {
        const [result] = await pool.query('INSERT INTO employees (name) VALUES (?)', [name]);
        const insertId = (result as any).insertId;
        return {id: insertId, name};
    }


    /**
     * Atualiza um funcionário pelo ‘ID’
     * @param id
     * @param name
     */
    async update(id: number, name: string): Promise<boolean> {
        const [result] = await pool.query('UPDATE employees SET name = ? WHERE id = ?', [name, id]);
        return (result as any).affectedRows > 0;
    }

    /**
     * Deleta um funcionário pelo ID
     * @param id - Employee_repository ID
     * @return {Promise<boolean>}
     */
    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
}
