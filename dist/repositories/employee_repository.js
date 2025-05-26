"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.EmployeeRepository = void 0;
const typedi_1 = require("typedi");
const connection_1 = require("../db/connection");
let EmployeeRepository = class EmployeeRepository {
    /**
     * Retorna todos os funcionários
     * @return {Promise<Employee[]>}'
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.pool.query('SELECT * FROM employees');
            return rows;
        });
    }
    /**
     * Encontra um funcionário pelo ID
     * @param id - Employee_repository ID
     * @return {Promise<Employee | null>}
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [rows] = yield connection_1.pool.query('SELECT * FROM employees WHERE id = ?', [id]);
            const employees = rows;
            return employees.length ? employees[0] : null;
        });
    }
    /**
     * Encontra um funcionário pelo nome
     * @param name - Employee_repository name
     * @return {Promise<Employee | null>}
     */
    create(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.pool.query('INSERT INTO employees (name) VALUES (?)', [name]);
            const insertId = result.insertId;
            return { id: insertId, name };
        });
    }
    /**
     * Atualiza um funcionário pelo ‘ID’
     * @param id
     * @param name
     */
    update(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.pool.query('UPDATE employees SET name = ? WHERE id = ?', [name, id]);
            return result.affectedRows > 0;
        });
    }
    /**
     * Deleta um funcionário pelo ID
     * @param id - Employee_repository ID
     * @return {Promise<boolean>}
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [result] = yield connection_1.pool.query('DELETE FROM employees WHERE id = ?', [id]);
            return result.affectedRows > 0;
        });
    }
};
exports.EmployeeRepository = EmployeeRepository;
exports.EmployeeRepository = EmployeeRepository = __decorate([
    (0, typedi_1.Service)()
], EmployeeRepository);
