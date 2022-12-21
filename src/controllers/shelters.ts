import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestCreateShelter, RequestDeleteShelter, RequestGetShelters, RequestUpdateShelter } from "../entities/models/shelters";

export class SheltersController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get('/shelters', this.handleGetShelters.bind(this));
        this.#router.post('/shelters', this.handleCreateShelter.bind(this));
        this.#router.put('/shelters', this.handleUpdateShelter.bind(this));
        this.#router.delete('/shelters', this.handleDeleteShelter.bind(this));
        app.use(this.#router);
    }

    async handleGetShelters(req: Request, res: Response){
        try{
            const body: RequestGetShelters = req.body;
            const data = await services.shelters.getShelters(body);
            
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

    async handleCreateShelter(req: Request, res: Response){
        try{
            const body: RequestCreateShelter = req.body;
            const data = await services.shelters.createShelter(body);
            
            res.status(201).json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleUpdateShelter(req: Request, res: Response){
        try{
            const body: RequestUpdateShelter = req.body;
            const data = await services.shelters.updateShelter(body);
            
            res.status(200).json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleDeleteShelter(req: Request, res: Response){
        try{
            const body: RequestDeleteShelter = req.body;
            const data = await services.shelters.deleteShelter(body);
            
            res.status(204).json({
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