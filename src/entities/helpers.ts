import { AuthHelper } from "../helpers/auth";
import { PetsHelper } from "../helpers/pets";
import { PetsTypesHelper } from "../helpers/petsTypes";
import { SheltersHelper } from "../helpers/shelters";

export interface helpers {
    pets: PetsHelper,
    petsTypes: PetsTypesHelper,
    auth: AuthHelper,
    shelters: SheltersHelper,
}