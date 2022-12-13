import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestGetPets } from "../entities/models/pets";

export class PetsController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get('/pets', this.handleGetPets.bind(this));
        this.#router.post('/pets', this.handleCreatePet.bind(this));
        this.#router.put('/pets', this.handleUpdatePet.bind(this));
        this.#router.delete('/pets', this.handleDeletePet.bind(this));
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

    async handleCreatePet(req: Request, res: Response){
        try{
            const body: RequestGetPets = req.body;
            const data = await services.pets.createPet(body);
            
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

    async handleUpdatePet(req: Request, res: Response){
        try{
            const body: RequestGetPets = req.body;
            const data = await services.pets.updatePet(body);
            
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

    async handleDeletePet(req: Request, res: Response){
        try{
            const body: RequestGetPets = req.body;
            const data = await services.pets.deletePet(body);
            
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