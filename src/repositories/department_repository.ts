import {Service} from 'typedi';
import {pool} from '../db/connection';
import {Department} from "../models/department";

/**
 * Repositório de departamentos
 */
@Service()
export class DepartmentRepository {
    /**
     * Retorna todos os departamentos
     * @param term - Termo de pesquisa opcional
     * @return {Promise<Department[]>}
     */
    async findAll(term: string): Promise<Department[]> {
        const query = term
            ? 'SELECT * FROM departments WHERE name LIKE ? ORDER BY name ASC'
            : 'SELECT * FROM departments ORDER BY name ASC';
        const params = term ? [`%${term}%`] : [];
        const [rows] = await pool.query(query, params);
        return rows as Department[];
    }

    /**
     * Encontra um departamento pelo ID
     * @param id - ID do departamento
     * @return {Promise<Department | null>}
     */
    async findById(id: number): Promise<Department | null> {
        const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
        const departments = rows as Department[];
        return departments.length ? departments[0] : null;
    }

    /**
     * Cria um novo departamento
     * @param name - Nome do departamento
     * @return {Promise<Department>}
     */
    async create(name: string): Promise<Department> {
        const [result] = await pool.query('INSERT INTO departments (name) VALUES (?)', [name]);
        const insertId = (result as any).insertId;
        return {id: insertId, name};
    }

    /**
     * Atualiza um departamento existente
     * @param id
     * @param name
     */
    async update(id: number, name: string): Promise<boolean> {
        const [result] = await pool.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
        return (result as any).affectedRows > 0;
    }

    /**
     * Deleta um departamento pelo ID
     * @param id - ID do departamento
     * @return {Promise<boolean>} - Retorna true se o departamento foi deletado, false caso contrário
     */
    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
}
