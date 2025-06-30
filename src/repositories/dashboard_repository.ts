import { Service } from "typedi";
import { pool } from "../db/connection";
import { MyResponse } from "../models/my_response";
import {
  AverageSalaryByDepartment,
  CommonStats,
  EmployeesByDepartment,
} from "../models/dashboard";

@Service()
export class DashboardRepository {
  /**
   * Obtém estatísticas do dashboard
   * @return {Promise<any>} - Um objeto contendo as estatísticas
   */
  async getStatistics(): Promise<MyResponse<CommonStats>> {
    const query: string = `
            SELECT (SELECT COUNT(*) FROM employees)                               AS total_employees,
                   (SELECT COUNT(*) FROM departments)                             AS total_departments,
                   (SELECT COUNT(*) FROM employees WHERE department_id IS NULL)   AS unassigned_employees,
                   (SELECT AVG(salary) FROM employees)                            AS average_salary,
                   (SELECT MAX(salary) FROM employees)                            AS highest_salary,
                   (SELECT MIN(salary) FROM employees WHERE salary > 0)           AS lowest_salary,
                   (SELECT COUNT(*)
                    FROM employees
                    WHERE admission_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)) AS new_hires_last_30_days,
                   (SELECT COUNT(DISTINCT department_id) 
                   FROM employees 
                   WHERE department_id IS NOT NULL 
                   AND dismissal_date IS NULL)                                   AS active_departments
        `;
    const [rows]: any = await pool.query(query);

    let stats = Array.isArray(rows) && rows.length > 0 ? rows[0] : rows;

    return {
      data: [
        {
          totalEmployees: stats.total_employees,
          totalDepartments: stats.total_departments,
          unassignedEmployees: stats.unassigned_employees,
          averageSalary: Number(stats.average_salary),
          highestSalary: stats.highest_salary,
          lowestSalary: stats.lowest_salary,
          newHiresLast30Days: stats.new_hires_last_30_days,
          activeDepartments: stats.active_departments,
        },
      ],
      queries: [query],
    };
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
        data: rows.map((row) => ({
          id: row.department_id,
          name: row.department_name,
          total_employees: row.employee_count,
        })),
        queries: [query],
      };
    }

    return {
      data: [],
      queries: [query],
    };
  }

  /**
   * Obtém a média salarial dos funcionários por departamento
   * @return {Promise<any[]>} - Lista de departamentos com média salarial
   */
  async getAverageSalaryByDepartment(): Promise<
    MyResponse<AverageSalaryByDepartment>
  > {
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
        data: rows.map((row) => ({
          id: row.department_id,
          name: row.department_name,
          average_salary: row.average_salary,
        })),
        queries: [query],
      };
    }

    return {
      data: [],
      queries: [query],
    };
  }
}
