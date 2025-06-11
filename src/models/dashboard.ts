export interface CommonStats {
    totalEmployees: number;
    totalDepartments: number;
    unassignedEmployees: number;
    averageSalary: number;
    highestSalary: number;
    lowestSalary: number;
    newHiresLast30Days: number;
    activeDepartments: number;
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