// src/service/EmployeeService.ts
import {Service} from 'typedi';
import {EmployeeRepository} from '../repositories/employee_repository';
import {Employee} from "../models/employee";

@Service()
export class EmployeeService {

    /**
     * Construtor da classe EmployeeService
     * @param userRepository
     */
    constructor(private readonly userRepository: EmployeeRepository) {
    }


    /**
     * Retorna todos os funcionários
     * @return {Promise<Employee[]>}
     */
    async getAll(): Promise<Employee[]> {
        return this.userRepository.findAll();
    }

    /**
     * Encontra um funcionário pelo ‘ID’
     * @param id
     */
    async getById(id: number): Promise<Employee | null> {
        return this.userRepository.findById(id);
    }

    /**
     * Encontra um funcionário pelo nome
     * @param name
     */
    async create(name: string): Promise<Employee> {
        return this.userRepository.create(name);
    }

    /**
     * Atualiza um funcionário pelo ID
     * @param id
     * @param name
     */
    async update(id: number, name: string): Promise<boolean> {
        return this.userRepository.update(id, name);
    }

    /**
     * Deleta um funcionário pelo ID
     * @param id
     */
    async delete(id: number): Promise<boolean> {
        return this.userRepository.delete(id);
    }
}
