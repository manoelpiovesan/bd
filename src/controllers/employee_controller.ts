import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { EmployeeRepository } from "../repositories/employee_repository";
import { Department } from "../models/department";

/**
 * Controller de funcionários
 */
@Service()
@JsonController("/employees")
export class EmployeeController {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  @Get("/")
  async getAll(
    @QueryParam("term") term: string,
    @QueryParam("limit") limit: number = 10,
    @QueryParam("offset") offset: number = 0
  ) {
    return this.employeeRepository.findAll(term, limit, offset);
  }

  @Get("/:id")
  async getById(@Param("id") id: number) {
    return this.employeeRepository.findById(id);
  }

  @Post("/")
  async create(
    @Body()
    body: {
      name: string;
      department: Department;
      salary: number;
      admissionDate?: string;
      dismissalDate?: string;
    }
  ) {
    return this.employeeRepository.create(
      body.name,
      body.salary,
      body.department,
      body.admissionDate,
      body.dismissalDate
    );
  }

  @Put("/:id")
  async update(
    @Param("id") id: number,
    @Body()
    body: {
      name: string;
      salary: number;
      department: Department;
      admissionDate?: string;
      dismissalDate?: string;
    }
  ) {
    return this.employeeRepository.update(
      id,
      body.name,
      body.salary,
      body.department,
      body.admissionDate,
      body.dismissalDate
    );
  }

  @Delete("/:id")
  async delete(@Param("id") id: number) {
    return this.employeeRepository.delete(id);
  }
}
