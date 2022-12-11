import { Express, Request, Response, Router } from "express";
import { servicesVersion } from "typescript";
import { services } from "../app";
import { RequestGetPets } from "../entities/models/pets";

export class PetsController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get('/pets', this.handleGetPets.bind(this));
        app.use(this.#router);
    }

    async handleGetPets(req: Request, res: Response){
        try{
            const body: RequestGetPets = req.body;
            const data = await services.pets.getPets(body);
            
            res.json({
                data,
                OK: true
            })
        }
        catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    }

}