import { Service } from "typedi";
import { pool } from "../db/connection";
import { Department } from "../models/department";
import { MyResponse } from "../models/my_response";
import mysql from "mysql2/promise";

/**
 * Repositório de funcionários
 */
@Service()
export class EmployeeRepository {
  /**
   * Retorna todos os funcionários
   * @return {Promise<Employee[]>}'
   */
  async findAll(
    term: string,
    limit: number,
    offset: number
  ): Promise<MyResponse<any>> {
    const termQuery = `SELECT e.id             as employee_id,
                                  e.name           as employee_name,
                                  e.salary         as employee_salary,
                                  e.admission_date as admission_date,
                                  e.dismissal_date as dismissal_date,
                                  d.id             as department_id,
                                  d.name           as department_name
                           FROM employees e
                                    LEFT JOIN departments d
                                              ON e.department_id = d.id
                           WHERE e.name LIKE ?
                           ORDER BY e.name ASC LIMIT ?
                           OFFSET ?`;
    const rawQuery = `SELECT e.id             as employee_id,
                                 e.name           as employee_name,
                                 e.salary         as employee_salary,
                                 e.admission_date as admission_date,
                                 e.dismissal_date as dismissal_date,
                                 d.id             as department_id,
                                 d.name           as department_name
                          FROM employees e
                                   LEFT JOIN departments d
                                             ON e.department_id = d.id
                          ORDER BY e.name ASC LIMIT ?
                          OFFSET ?`;

    const query = term ? termQuery : rawQuery;

    const params = term ? [`%${term}%`, limit, offset] : [limit, offset];
    const [rows] = await pool.query(query, params);

    return {
      data: (rows as any[]).map((row) => ({
        id: row.employee_id,
        name: row.employee_name,
        salary: row.employee_salary,
        admissionDate: row.admission_date,
        dismissalDate: row.dismissal_date,
        department: row.department_id
          ? {
              id: row.department_id,
              name: row.department_name,
            }
          : null,
      })),
      queries: [mysql.format(query, params)],
    };
  }

  /**
   * Encontra um funcionário pelo ID
   * @param id - Employee ID
   * @return {Promise<Employee | null>}
   */
  async findById(id: number): Promise<MyResponse<any> | null> {
    const query: string = `SELECT e.id             as employee_id,
                                      e.name           as employee_name,
                                      e.salary         as employee_salary,
                                      e.admission_date as admission_date,
                                      e.dismissal_date as dismissal_date,
                                      d.id             as department_id,
                                      d.name           as department_name
                               FROM employees e
                                        LEFT JOIN departments d ON e.department_id = d.id
                               WHERE e.id = ?`;

    const [rows] = await pool.query(query, [id]);

    const row = (rows as any[])[0];
    if (!row) return null;

    return {
      data: [
        {
          id: row.employee_id,
          name: row.employee_name,
          salary: row.employee_salary,
          admissionDate: row.admission_date,
          dismissalDate: row.dismissal_date,
          department: row.department_id
            ? {
                id: row.department_id,
                name: row.department_name,
              }
            : null,
        },
      ],
      queries: [mysql.format(query, [id])],
    };
  }

  /**
   * Cria um novo funcionário
   * @param name - Employee name
   * @param salary
   * @param department
   * @param admissionDate - Data de admissão (formato: YYYY-MM-DD ou Date)
   * @param dismissalDate - Data de demissão (formato: YYYY-MM-DD ou Date, opcional)
   * @return {Promise<Employee | null>}
   */
  async create(
    name: string,
    salary: number,
    department: Department | null,
    admissionDate?: string | Date,
    dismissalDate?: string | Date
  ): Promise<MyResponse<any>> {
    const query: string = `INSERT INTO employees (name, salary, department_id, admission_date, dismissal_date)
                               VALUES (?, ?, ?, ?, ?)`;

    const departmentId = department ? department.id : null;

    const [result] = await pool.query(query, [
      name,
      salary,
      departmentId,
      admissionDate || null,
      dismissalDate || null,
    ]);

    const insertId = (result as any).insertId;

    return {
      data: [
        {
          id: insertId,
          name,
          department,
          salary,
          admissionDate,
          dismissalDate,
        },
      ],
      queries: [
        mysql.format(query, [
          name,
          salary,
          departmentId,
          admissionDate || null,
          dismissalDate || null,
        ]),
      ],
    };
  }

  /**
   * Atualiza um funcionário pelo 'ID'
   * @param id
   * @param name
   * @param salary
   * @param department
   * @param admissionDate
   * @param dismissalDate
   */
  async update(
    id: number,
    name: string,
    salary: number,
    department: Department | null,
    admissionDate?: string | Date,
    dismissalDate?: string | Date
  ): Promise<MyResponse<boolean>> {
    const query: string = `UPDATE employees
                               SET name          = ?,
                                   salary        = ?,
                                   department_id = ?,
                                   admission_date = ?,
                                   dismissal_date = ?
                               WHERE id = ?`;
    const departmentId = department ? department.id : null;

    const [result] = await pool.query(query, [
      name,
      salary,
      departmentId,
      admissionDate || null,
      dismissalDate || null,
      id,
    ]);
    return {
      data: [(result as any).affectedRows > 0],
      queries: [
        mysql.format(query, [
          name,
          salary,
          departmentId,
          admissionDate || null,
          dismissalDate || null,
          id,
        ]),
      ],
    };
  }

  /**
   * Deleta um funcionário pelo ID
   * @param id - Employee ID
   * @return {Promise<boolean>}
   */
  async delete(id: number): Promise<MyResponse<boolean>> {
    const [result] = await pool.query(`DELETE FROM employees WHERE id = ?`, [
      id,
    ]);
    return {
      data: [(result as any).affectedRows > 0],
      queries: [
        mysql.format(
          `DELETE
                                    FROM employees
                                    WHERE id = ?`,
          [id]
        ),
      ],
    };
  }
}
