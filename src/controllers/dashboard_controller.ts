import {JsonController, Get} from 'routing-controllers';
import {Service} from 'typedi';
import {DashboardRepository} from "../repositories/dashboard_repository";

/**
 * Controller do Dashboard
 */
@Service()
@JsonController('/dashboard')
export class DashboardController {

    constructor(private readonly dashboardRepository: DashboardRepository) {
    }

    @Get('/common-stats')
    async getDashboardData() {
        return this.dashboardRepository.getStatistics();
    }

    @Get('/employees-by-department')
    async getEmployeesByDepartment() {
        return this.dashboardRepository.getEmployeesByDepartment();
    }

    @Get('/average-salary-by-department')
    async getAverageSalaryByDepartment() {
        return this.dashboardRepository.getAverageSalaryByDepartment();
    }

}