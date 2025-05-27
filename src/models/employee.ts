import {Department} from "./department";

/**
 * Employee_repository interface
 */
export interface Employee {
    id: number;
    name: string;
    admissionDate: Date;
    dismissalDate?: Date;
    salary: number;
    department: Department
}

