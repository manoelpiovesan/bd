import {Service} from 'typedi';
import {pool} from '../db/connection';
import {Department} from "../models/department";
import {MyResponse} from "../models/my_response";

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
    async findAll(term: string): Promise<MyResponse<Department>> {
        const query = term
            ? `SELECT *
               FROM departments
               WHERE name LIKE ?
               ORDER BY name`
            : `SELECT *
               FROM departments
               ORDER BY name`;
        const params = term ? [`%${term}%`] : [];
        const [rows] = await pool.query(query, params);
        return {
            data: rows as Department[],
            queries: [pool.format(query, params)]
        };
    }

    /**
     * Encontra um departamento pelo ID
     * @param id - ID do departamento
     * @return {Promise<Department | null>}
     */
    async findById(id: number): Promise<MyResponse<Department> | null> {
        const [rows] = await pool.query(`SELECT *
                                         FROM departments
                                         WHERE id = ?`, [id]);
        const departments = rows as Department[];
        const first = departments[0];
        return {
            data: [first],
            queries: [pool.format(`SELECT *
                                   FROM departments
                                   WHERE id = ?`, [id])]
        };
    }

    /**
     * Cria um novo departamento
     * @param name - Nome do departamento
     * @return {Promise<Department>}
     */
    async create(name: string): Promise<MyResponse<Department>> {
        const query: string = 'INSERT INTO departments (name) VALUES (?)';
        const [result] = await pool.query(query, [name]);
        const insertId = (result as any).insertId;
        return {
            data: [{id: insertId, name}],
            queries: [pool.format(query, [name])]
        };
    }

    /**
     * Atualiza um departamento existente
     * @param id
     * @param name
     */
    async update(id: number, name: string): Promise<MyResponse<boolean>> {
        const query: string = 'UPDATE departments SET name = ? WHERE id = ?';
        const [result] = await pool.query(query, [name, id]);
        return {
            data: [(result as any).affectedRows > 0],
            queries: [pool.format(query, [name, id])]
        }
    }

    /**
     * Deleta um departamento pelo ID
     * @param id - ID do departamento
     * @return {Promise<boolean>} - Retorna true se o departamento foi deletado, false caso contrário
     */
    async delete(id: number): Promise<MyResponse<boolean>> {
        const query: string = 'DELETE FROM departments WHERE id = ?';
        const [result] = await pool.query(query, [id]);
        return {
            data: [(result as any).affectedRows > 0],
            queries: [pool.format(query, [id])]
        };
    }
}
