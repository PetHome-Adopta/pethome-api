import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

type gender = "male" | "female";

export interface Pet extends baseModel{
    key: string;
    name: string;
    description: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    adopted: boolean;
    urgentAdoption: boolean;
    contactedBy?: [{
        name: string;
        email: string;
        phoneNumber?: string;
    }];

    shelterKey: string;
    petTypeKey: string;
}

export interface RequestGetPets {
    key?: string;
    name?: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    adopted?: boolean;

    shelterKey?: string;
    petTypeKey?: string;
}

export interface RequestCreatePet {
    name: string;
    description: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    urgentAdoption: boolean;

    shelterKey: string;
    petTypeKey: string;
}

export interface RequestUpdatePet {
    key: string;
    name?: string;
    description?: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    adopted?: boolean;
    urgentAdoption?: boolean;

    shelterKey?: string;
    petTypeKey?: string;
}

export interface RequestDeletePet {
    key: string;
}

export interface GetPetsHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
        color?: string;
        age?: string;
        breed?: string;
        gender?: gender;
        behaviour?: string;
        sterilized?: boolean;
        adopted?: boolean;

        shelterKey?: string;
        petTypeKey?: string;
        deletedAt?: Date;
    }
}

export interface CreatePetHelper {
    name: string;
    description: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    sterilized?: boolean;
    adopted: boolean;
    urgentAdoption: boolean;

    shelterKey: string;
    petTypeKey: string;
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