import { Express } from "express";
import { PetsController } from "./pets";

export class Controllers {

    private app: Express;

    constructor (app: Express) {
        this.app = app;
        new PetsController(app)
    }
}