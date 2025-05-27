import {Service} from 'typedi';
import {pool} from '../db/connection';
import {Employee} from "../models/employee";
import {Department} from "../models/department";

/**
 * Repositório de funcionários
 */
@Service()
export class EmployeeRepository {

    /**
     * Retorna todos os funcionários
     * @return {Promise<Employee[]>}'
     */
    async findAll(term: string): Promise<any[]> {
        const query = term
            ? 'SELECT e.id as employee_id, e.name as employee_name, e.salary as employee_salary, e.admission_date as admission_date, e.dismissal_date as dismissal_date, d.id as department_id, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id  WHERE e.name LIKE ? ORDER BY e.name ASC'
            : 'SELECT e.id as employee_id, e.name as employee_name, e.salary as employee_salary, e.admission_date as admission_date, e.dismissal_date as dismissal_date, d.id as department_id, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id ORDER BY e.name ASC';

        const params = term ? [`%${term}%`] : [];
        const [rows] = await pool.query(query, params);

        return (rows as any[]).map(row => ({
            id: row.employee_id,
            name: row.employee_name,
            salary: row.employee_salary,
            admissionDate: row.admission_date,
            dismissalDate: row.dismissal_date,
            department: row.department_id ? {
                id: row.department_id,
                name: row.department_name
            } : null
        }));
    }

    /**
     * Encontra um funcionário pelo ID
     * @param id - Employee ID
     * @return {Promise<Employee | null>}
     */
    async findById(id: number): Promise<any | null> {
        const [rows] = await pool.query(
            'SELECT e.id as employee_id, e.name as employee_name, d.id as department_id, d.name as department_name FROM employees e LEFT JOIN departments d ON e.department_id = d.id WHERE e.id = ?',
            [id]
        );

        const row = (rows as any[])[0];
        if (!row) return null;

        return {
            id: row.employee_id,
            name: row.employee_name,
            department: row.department_id ? {
                id: row.department_id,
                name: row.department_name
            } : null
        };
    }


    /**
     * Cria um novo funcionário
     * @param name - Employee name
     * @param salary
     * @param department
     * @return {Promise<Employee | null>}
     */
    async create(name: string, salary: number, department: Department): Promise<any> {

        const [result] = await pool.query(
            'INSERT INTO employees (name, department_id, salary) VALUES (?, ?, ?)',
            [name, department.id, salary]
        );

        const insertId = (result as any).insertId;

        return {id: insertId, name, department, salary};
    }


    /**
     * Atualiza um funcionário pelo ‘ID’
     * @param id
     * @param name
     * @param salary
     * @param department
     */
    async update(id: number, name: string, salary: number, department: Department): Promise<boolean> {
        const [result] = await pool.query(
            'UPDATE employees SET name = ?, salary = ?, department_id = ? WHERE id = ?',
            [name, salary, department.id, id]
        );
        return (result as any).affectedRows > 0;
    }

    /**
     * Deleta um funcionário pelo ID
     * @param id - Employee ID
     * @return {Promise<boolean>}
     */
    async delete(id: number): Promise<boolean> {
        const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [id]);
        return (result as any).affectedRows > 0;
    }
}
