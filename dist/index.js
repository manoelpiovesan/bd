"use strict";
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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const employee_controller_1 = require("./controllers/employee_controller");
const connection_1 = require("./db/connection");
const PORT = process.env.PORT || 3030;
/**
 * Função principal para iniciar o servidor
 * @returns {Promise<void>}
 */
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        (0, routing_controllers_1.useContainer)(typedi_1.Container);
        yield (0, connection_1.setupDatabase)();
        const app = (0, routing_controllers_1.createExpressServer)({
            controllers: [employee_controller_1.EmployeeController],
        });
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    });
}
main().then(r => console.log('Application started successfully'));
