import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequesCreatePetsTypes, RequestDeletePetsTypes, RequestGetPetsTypes, RequestUpdatePetsTypes } from "../models/petsTypes";
import { PetsServices } from '../services/pets';
import { PATHS } from "../utils/Constants";

export class PetTypesController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get(PATHS.V1 + PATHS.PETS + PATHS.TYPES, this.handleGetPetsTypes.bind(this));
        this.#router.post(PATHS.V1 + PATHS.ADMIN + PATHS.PETS + PATHS.TYPES, this.handleCreatePetType.bind(this));
        this.#router.put(PATHS.V1 + PATHS.ADMIN + PATHS.PETS + PATHS.TYPES, this.handleUpdatePetType.bind(this));
        this.#router.delete(PATHS.V1 + PATHS.ADMIN + PATHS.PETS + PATHS.TYPES, this.handleDeletePetType.bind(this));
        app.use(this.#router);
    }

    async handleGetPetsTypes(req: Request, res: Response): Promise<any>{
        try{
            const body: RequestGetPetsTypes = req.body;
            const data = await services.petsTypes.getPetsType(body);
            
            res.json({
                data: data[0],
                count: data[1],
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleCreatePetType(req: Request, res: Response): Promise<any>{
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

    async handleUpdatePetType(req: Request, res: Response): Promise<any>{
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

    async handleDeletePetType(req: Request, res: Response): Promise<any>{
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