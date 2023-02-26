import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

export interface RequestGetPetsTypes {
    key?: string;
    name?: string;
}

export interface RequestUpdatePetsTypes {
    name: string;
    key: string;
}

export interface RequestDeletePetsTypes {
    key: string;
}

export interface RequesCreatePetsTypes {
    name: string;
}

export interface GetPetsTypesHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
        deletedAt?: Date;
    }
}

export interface PetType extends baseModel{
    _id: any;
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
    key: string;
}