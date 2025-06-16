import {Body, JsonController, Post} from "routing-controllers";
import {Service} from "typedi";
import {PlaygroundRepository} from "../repositories/playground_repository";

/**
 * Controller de Playground
 */
@Service()
@JsonController('/playground')
export class PlaygroundController {
    constructor(private readonly repository: PlaygroundRepository) {
    }

    @Post('/')
    async create(@Body() body: { query: string }) {
        return this.repository.executeQuery(body.query);
    }

}