import { baseModel } from "./baseModel";
import { generalOptions } from "../mongodb";

type gender = "male" | "female";

export interface RequestGetPets {
    key?: string;
    name?: string;
}

export interface GetPetsHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
        color?: string;
        age?: string;
        breed?: string;
        shelterKey?: string;
        gender?: gender;
        behaviour?: string;
        sterilized?: boolean;
    }
}

export interface Pet extends baseModel{
    key: string;
    name: string;
    description?: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    adopted: boolean;
    adoptedBy?: string;

    shelterKey: string;
    type: string;
}

export interface CreatePetHelper {
    name: string;
    description?: string;
    color?: string;
    age?: string;
    breed?: string;
    shelterKey: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    type: string;
}

export interface UpdatePetHelper {
    data: CreatePetHelper,
    filters: GetPetsHelper["filters"]
}

export interface DeletePetHelper {
    key?: string;
    name?: string;
    _id?: string;
}