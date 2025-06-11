export interface CommonStats {
    totalEmployees: number;
    totalDepartments: number;
    unassignedEmployees: number;
}

export interface EmployeesByDepartment {
    id: number;
    name: string;
    total_employees: number;
}

export interface AverageSalaryByDepartment {
    id: number;
    name: string;
    average_salary: number;
}