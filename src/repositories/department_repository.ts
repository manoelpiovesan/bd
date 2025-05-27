import {Service} from 'typedi';
import {pool} from '../db/connection';
import {Department} from "../models/department";

@Service()
export class DepartmentRepository {
    async findAll(term: string): Promise<Department[]> {
        const query = term
            ? 'SELECT * FROM departments WHERE name LIKE ? ORDER BY name ASC'
            : 'SELECT * FROM departments ORDER BY name ASC';
        const params = term ? [`%${term}%`] : [];
        const [rows] = await pool.query(query, params);
        return rows as Department[];
    }

    async findById(id: number): Promise<Department | null> {
        const [rows] = await pool.query('SELECT * FROM departments WHERE id = ?', [id]);
        const departments = rows as Department[];
        return departments.length ? departments[0] : null;
    }

    async create(name: string): Promise<Department> {
        const [result] = await pool.query('INSERT INTO departments (name) VALUES (?)', [name]);
        const insertId = (result as any).insertId;
        return {id: insertId, name};
    }

    async update(id: number, name: string): Promise<boolean> {
        const [result] = await pool.query('UPDATE departments SET name = ? WHERE id = ?', [name, id]);
        return (result as any).affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query('DELETE FROM departments WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
}
