import {JsonController, Get, Post, Put, Delete, Param, Body} from 'routing-controllers';
import {Service} from 'typedi';
import {EmployeeService} from '../services/employee_service';

@Service()
@JsonController('/employees')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) {
    }

    @Get('/')
    async getAll() {
        return this.employeeService.getAll();
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.employeeService.getById(id);
    }

    @Post('/')
    async create(@Body() body: { name: string }) {
        return this.employeeService.create(body.name);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: { name: string }) {
        return this.employeeService.update(id, body.name);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.employeeService.delete(id);
    }
}
