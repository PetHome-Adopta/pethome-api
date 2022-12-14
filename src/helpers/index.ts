import { helpers } from "../entities/helpers";
import { Databases } from "../infrastructure/databases/databases";
import { PetsHelper } from "./pets";
import { PetsTypesHelper } from "./petsTypes";

export class Helpers {

    private helpers: helpers;

    constructor (databases: Databases) {
        this.helpers = {
            pets: new PetsHelper(databases),
            petsTypes: new PetsTypesHelper(databases),
        };
    }

    getHelpers() {
        return this.helpers;
    }


}