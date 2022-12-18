import { AuthServices } from "../services/auth";
import { PetsServices } from "../services/pets";
import { PetsTypesServices } from "../services/petsTypes";

export interface services {
    pets: PetsServices,
    petsTypes: PetsTypesServices,
    auth: AuthServices
}