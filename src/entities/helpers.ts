import { AuthHelper } from "../helpers/auth";
import { PetsHelper } from "../helpers/pets";
import { PetsTypesHelper } from "../helpers/petsTypes";
import { SheltersHelper } from "../helpers/shelters";
import { UsersHelper } from "../helpers/users";

export interface helpers {
    auth: AuthHelper,
    users: UsersHelper,
    pets: PetsHelper,
    petsTypes: PetsTypesHelper,
    shelters: SheltersHelper,
}