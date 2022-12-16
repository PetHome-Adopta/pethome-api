import { services } from "../entities/services";
import { PetsServices } from "./pets";
import { PetsTypesServices } from "./petsTypes";

export class Services {

    private services: services;

    constructor () {
        this.services = {
            pets: new PetsServices(),
            petsTypes: new PetsTypesServices(),
        }
    }

    public getServices(){
        return this.services;
    }
}