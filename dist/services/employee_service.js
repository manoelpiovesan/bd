"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeService = void 0;
// src/service/EmployeeService.ts
const typedi_1 = require("typedi");
const employee_repository_1 = require("../repositories/employee_repository");
let EmployeeService = class EmployeeService {
    /**
     * Construtor da classe EmployeeService
     * @param userRepository
     */
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    /**
     * Retorna todos os funcionários
     * @return {Promise<Employee[]>}
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findAll();
        });
    }
    /**
     * Encontra um funcionário pelo ‘ID’
     * @param id
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findById(id);
        });
    }
    /**
     * Encontra um funcionário pelo nome
     * @param name
     */
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.create(name);
        });
    }
    /**
     * Atualiza um funcionário pelo ID
     * @param id
     * @param name
     */
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.update(id, name);
        });
    }
    /**
     * Deleta um funcionário pelo ID
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.delete(id);
        });
    }
};
exports.EmployeeService = EmployeeService;
exports.EmployeeService = EmployeeService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [employee_repository_1.EmployeeRepository])
], EmployeeService);
