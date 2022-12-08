import { services } from "../entities/services";
import { PetsServices } from "./pets";

export class Services {

    private services: services = {
       pets: null
    }

    constructor () {
        this.services.pets = new PetsServices();
    }

    public getServices(){
        return this.services;
    }
}