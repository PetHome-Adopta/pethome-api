import { helpers } from "../../entities/helpers";
import { Databases } from "../../infrastructure/databases/databases";
import { AuthHelper } from "../auth";
import { PetsHelper } from "../pets";
import { PetsTypesHelper } from "../petsTypes";
import { SheltersHelper } from "../shelters";

export class Helpers {

    private helpers: helpers;

    constructor (databases: Databases) {
        this.helpers = {
            pets: new PetsHelper(databases),
            petsTypes: new PetsTypesHelper(databases),
            auth: new AuthHelper(databases),
            shelters: new SheltersHelper(databases),
        };
    }

    getHelpers() {
        return this.helpers;
    }


}