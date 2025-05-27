import {JsonController, Get, Post, Put, Delete, Param, Body, QueryParam} from 'routing-controllers';
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

    @Get('/')
    async getDashboardData() {
        return this.dashboardRepository.getStatistics();
    }




}