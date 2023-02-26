import { services } from "../../entities/services";
import { PetsServices } from "../pets";
import { PetsTypesServices } from "../petsTypes";
import { AuthServices } from '../auth';
import { SheltersServices } from '../shelters';
import { UsersServices } from '../users';

export class Services {

    private services: services;

    constructor() {
        this.services = {
            pets: new PetsServices(),
            petsTypes: new PetsTypesServices(),
            auth: new AuthServices(),
            shelters: new SheltersServices(),
            users: new UsersServices(),
        }
    }

    public getServices() {
        return this.services;
    }
}