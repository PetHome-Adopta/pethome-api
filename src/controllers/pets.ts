import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestCreatePet, RequestDeletePet, RequestGetPets, RequestUpdatePet } from "../entities/models/pets";

export class PetsController {
    #router: Router;

    constructor(app: Express) {
        this.#router = Router();
        this.#router.get('/pets', this.handleGetPets.bind(this));
        this.#router.post('/pets', this.handleCreatePet.bind(this));
        this.#router.put('/pets', this.handleUpdatePet.bind(this));
        this.#router.delete('/pets', this.handleDeletePet.bind(this));
        app.use(this.#router);
    }

    async handleGetPets(req: Request, res: Response) {
        try {
            const body: RequestGetPets = req.body;
            const data = await services.pets.getPets(body);

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

    async handleCreatePet(req: Request, res: Response) {
        try {
            const body: RequestCreatePet = req.body;
            const data = await services.pets.createPet(body);

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

    async handleUpdatePet(req: Request, res: Response) {
        try {
            const body: RequestUpdatePet = req.body;
            const data = await services.pets.updatePet(body);

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

    async handleDeletePet(req: Request, res: Response) {
        try {
            const body: RequestDeletePet = req.body;
            const data = await services.pets.deletePet(body);

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