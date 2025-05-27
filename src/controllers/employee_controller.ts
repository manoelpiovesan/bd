import {JsonController, Get, Post, Put, Delete, Param, Body, QueryParam} from 'routing-controllers';
import {Service} from 'typedi';
import {EmployeeRepository} from '../repositories/employee_repository';
import {Department} from "../models/department";

/**
 * Controller de funcionários
 */
@Service()
@JsonController('/employees')
export class EmployeeController {
    constructor(private readonly employeeRepository: EmployeeRepository) {
    }

    @Get('/')
    async getAll(@QueryParam('term') term: string) {
        return this.employeeRepository.findAll(term);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.employeeRepository.findById(id);
    }

    @Post('/')
    async create(@Body() body: { name: string, department: Department }) {
        return this.employeeRepository.create(body.name, body.department);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: { name: string, department: Department }) {
        return this.employeeRepository.update(id, body.name, body.department);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.employeeRepository.delete(id);
    }
}
