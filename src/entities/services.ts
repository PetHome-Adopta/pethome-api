import { AuthServices } from "../services/auth";
import { PetsServices } from "../services/pets";
import { PetsTypesServices } from "../services/petsTypes";
import { SheltersServices } from "../services/shelters";

export interface services {
    pets: PetsServices,
    petsTypes: PetsTypesServices,
    auth: AuthServices,
    shelters: SheltersServices,
}