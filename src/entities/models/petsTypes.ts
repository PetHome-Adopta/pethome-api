import { baseModel } from "./baseModel";
import { generalOptions } from "../mongodb";

export interface RequestGetPetsTypes {
    key?: string;
    name?: string;
}

export interface GetPetsTypesHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
    }
}

export interface PetType extends baseModel{
    key: string;
    name: string;

    pet: string;
}

export interface CreatePetTypeHelper {
    name: string;
}

export interface UpdatePetTypeHelper {
    data: CreatePetTypeHelper,
    filters: GetPetsTypesHelper["filters"]
}

export interface DeletePetTypeHelper {
    key?: string;
    name?: string;
    _id?: string;
}