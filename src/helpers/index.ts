import { helpers } from "../entities/helpers";
import { Databases } from "../infrastructure/databases/databases";
import { PetsHelper } from "./pets";

export class Helpers {

    private helpers: helpers;

    constructor (databases: Databases) {
        this.helpers = {
            pets: new PetsHelper(databases)
        };
    }

    getHelpers() {
        return this.helpers;
    }


}