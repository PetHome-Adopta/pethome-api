import { Express } from "express";
import { PetsController } from "./pets";
import { PetTypesController } from "./petsTypes";
export class Controllers {

    private app: Express;

    constructor (app: Express) {
        this.app = app;
        new PetsController(app);
        new PetTypesController(app);
    }
}