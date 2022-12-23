import { Express } from "express";
import { PetsController } from "../pets";
import { PetTypesController } from "../petsTypes";
import { AuthController } from '../auth';
import { SheltersController } from '../shelters';
export class Controllers {

    constructor (app: Express) {
        new PetsController(app);
        new PetTypesController(app);
        new AuthController(app);
        new SheltersController(app);
    }
}