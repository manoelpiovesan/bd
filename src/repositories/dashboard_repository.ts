import {Service} from 'typedi';
import {pool} from '../db/connection';
import {MyResponse} from "../models/my_response";
import {AverageSalaryByDepartment, CommonStats, EmployeesByDepartment} from "../models/dashboard";

@Service()
export class DashboardRepository {

    /**
     * Obtém estatísticas do dashboard
     * @return {Promise<any>} - Um objeto contendo as estatísticas
     */
    async getStatistics(): Promise<MyResponse<CommonStats>> {
        const query: string = `
            SELECT (SELECT COUNT(*) FROM employees)                             AS total_employees,
                   (SELECT COUNT(*) FROM departments)                           AS total_departments,
                   (SELECT COUNT(*) FROM employees WHERE department_id IS NULL) AS unassigned_employees
        `;
        const [rows]: any = await pool.query(query);

        let stats = Array.isArray(rows) && rows.length > 0 ? rows[0] : rows;

        return {
            data: [{
                totalEmployees: stats.total_employees,
                totalDepartments: stats.total_departments,
                unassignedEmployees: stats.unassigned_employees,
            }],
            queries: [query],
        }
    }

    /**
     * Obtém a lista de departamentos com o número de funcionários em cada um
     * @return {Promise<any[]>} - Lista de departamentos com contagem de funcionários
     */
    async getEmployeesByDepartment(): Promise<MyResponse<EmployeesByDepartment>> {
        const query: string = `
            SELECT d.id        AS department_id,
                   d.name      AS department_name,
                   COUNT(e.id) AS employee_count
            FROM departments d
                     LEFT JOIN employees e ON d.id = e.department_id
            GROUP BY d.id
            ORDER BY COUNT(e.id)
        `;

        const [rows]: any = await pool.query(query);

        if (Array.isArray(rows)) {
            return {
                data: rows.map(row => ({
                    id: row.department_id,
                    name: row.department_name,
                    total_employees: row.employee_count
                })),
                queries: [query]
            };
        }

        return {
            data: [],
            queries: [query]
        }


    }

    /**
     * Obtém a média salarial dos funcionários por departamento
     * @return {Promise<any[]>} - Lista de departamentos com média salarial
     */
    async getAverageSalaryByDepartment(): Promise<MyResponse<AverageSalaryByDepartment>> {
        const query: string = `
            SELECT d.id          AS department_id,
                   d.name        AS department_name,
                   AVG(e.salary) AS average_salary
            FROM departments d
                     INNER JOIN employees e ON d.id = e.department_id
            GROUP BY d.id
            ORDER BY AVG(e.salary) DESC
        `;
        const [rows]: any = await pool.query(query);

        if (Array.isArray(rows)) {
            return {
                data: rows.map(row => ({
                    id: row.department_id,
                    name: row.department_name,
                    average_salary: row.average_salary
                })),
                queries: [query]
            }
        }

        return {
            data: [],
            queries: [query]
        }
    }


}
