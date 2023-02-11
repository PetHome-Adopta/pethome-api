import { helpers } from "../../entities/helpers";
import { Databases } from "../../infrastructure/databases/databases";
import { AuthHelper } from "../auth";
import { PetsHelper } from "../pets";
import { PetsTypesHelper } from "../petsTypes";
import { SheltersHelper } from "../shelters";
import { UsersHelper } from "../users";

export class Helpers {

    private helpers: helpers;

    constructor (databases: Databases) {
        this.helpers = {
            auth: new AuthHelper(databases),
            users: new UsersHelper(databases),
            pets: new PetsHelper(databases),
            petsTypes: new PetsTypesHelper(databases),
            
            shelters: new SheltersHelper(databases),
        };
    }

    getHelpers() {
        return this.helpers;
    }


}