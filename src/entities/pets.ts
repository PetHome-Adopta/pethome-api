import { generalOptions } from "./mongodb";

export interface RequestGetPets {
    key?: string;
    name?: string;
}

export interface GetPetsHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
    }
}

export interface CreatePetHelper {
    name: string;
    color?: string;
    age?: string;
    breed?: string;
    dogPound: string;
}

export interface UpdatePetHelper {
    data: CreatePetHelper,
    filters: {
        key?: string;
        name?: string;
    }
}

export interface DeletePetHelper {
    key?: string;
    name?: string;
    _id?: string;
}