import {JsonController, Get, Post, Put, Delete, Param, Body, QueryParam} from 'routing-controllers';
import {Service} from 'typedi';
import {DepartmentRepository} from '../repositories/department_repository';

/**
 * Controller de departamentos
 */
@Service()
@JsonController('/departments')
export class DepartmentController {
    constructor(private readonly departmentRepository: DepartmentRepository) {
    }

    @Get('/')
    async getAll(@QueryParam('term') term: string) {
        return this.departmentRepository.findAll(term);
    }

    @Get('/:id')
    async getById(@Param('id') id: number) {
        return this.departmentRepository.findById(id);
    }

    @Post('/')
    async create(@Body() body: { name: string }) {
        return this.departmentRepository.create(body.name);
    }

    @Put('/:id')
    async update(@Param('id') id: number, @Body() body: { name: string }) {
        return this.departmentRepository.update(id, body.name);
    }

    @Delete('/:id')
    async delete(@Param('id') id: number) {
        return this.departmentRepository.delete(id);
    }
}
