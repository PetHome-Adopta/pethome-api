import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequesCreatePetsTypes, RequestDeletePetsTypes, RequestGetPetsTypes, RequestUpdatePetsTypes } from "../entities/models/petsTypes";
import { PetsServices } from '../services/pets';

export class PetTypesController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get('/pets/types', this.handleGetPets.bind(this));
        this.#router.post('/pets/types', this.handleCreatePet.bind(this));
        this.#router.put('/pets/types', this.handleUpdatePet.bind(this));
        this.#router.delete('/pets/types', this.handleDeletePet.bind(this));
        app.use(this.#router);
    }

    async handleGetPets(req: Request, res: Response){
        try{
            const body: RequestGetPetsTypes = req.body;
            const data = await services.petsTypes.getPetsType(body);
            
            res.json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleCreatePet(req: Request, res: Response){
        try{
            const body: RequesCreatePetsTypes = req.body;
            const data = await services.petsTypes.createPetType(body);
            
            res.json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleUpdatePet(req: Request, res: Response){
        try{
            const body: RequestUpdatePetsTypes = req.body;
            const data = await services.petsTypes.updatePetType(body);
            
            res.json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleDeletePet(req: Request, res: Response){
        try{
            const body: RequestDeletePetsTypes = req.body;
            const data = await services.petsTypes.deletePetType(body);
            
            res.json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }
}