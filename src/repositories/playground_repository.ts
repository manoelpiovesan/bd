import {Service} from "typedi";
import {MyResponse} from "../models/my_response";
import {pool} from "../db/connection";

/**
 * Repositório de departamentos
 */
@Service()
export class PlaygroundRepository {
    /**
     * Retorna todos os departamentos
     * @return {Promise<Department[]>}
     * @param query
     */
    async executeQuery(query: string): Promise<MyResponse<any>> {
        const [rows] = await pool.query(query);
        return {
            data: rows as any[],
            queries: [pool.format(query)]
        };
    }
}