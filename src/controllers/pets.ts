import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestCreatePet, RequestDeletePet, RequestGetPets, RequestUpdatePet } from "../models/pets";
import { PATHS } from "../utils/Constants";

export class PetsController {
    #router: Router;

    constructor(app: Express) {
        this.#router = Router();
        this.#router.get(PATHS.V1 + PATHS.ADMIN + PATHS.PETS, this.handleGetPets.bind(this));
        this.#router.post(PATHS.V1 + PATHS.ADMIN + PATHS.PETS, this.handleCreatePet.bind(this));
        this.#router.put(PATHS.V1 + PATHS.ADMIN + PATHS.PETS, this.handleUpdatePet.bind(this));
        this.#router.delete(PATHS.V1 + PATHS.ADMIN + PATHS.PETS, this.handleDeletePet.bind(this));
        app.use(this.#router);
    }

    async handleGetPets(req: Request, res: Response) {
        try {
            
            const body: RequestGetPets = req.body;
            const data = await services.pets.getPets(body);

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