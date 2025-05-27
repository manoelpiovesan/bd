import {Department} from "./department";

/**
 * Employee_repository interface
 */
export interface Employee {
    id: number;
    name: string;
    //departmentId: number;
    department: Department
}

