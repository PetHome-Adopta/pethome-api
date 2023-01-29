import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

type gender = "male" | "female";
type contactAction = "adopt" | "foster" | "sponsor";

export interface Pet extends baseModel{
    _id: any;
    key: string;
    //TODO: picture
    //TODO: hace falta un boolean de camada??
    name: string;
    description: string;
    color: string;
    age: string;
    breed: string;
    gender: gender;
    behaviour: string;
    weight: number;

    sterilized: boolean;
    vaccinated: boolean;
    dewormed: boolean;
    healthy: boolean;
    identified: boolean;
    microchipped: boolean;

    adopted: boolean;
    urgentAdoption: boolean;
    adoptionPrice: number;
    deliveryPlace: string;

    contactedBy?: [{
        name: string;
        email: string;
        phoneNumber: string;
        interestedIn: contactAction;
        message: string;
        at: Date;
    }];

    statusOnShelter: string;
    shelterKey: string;
    petTypeKey: string;
    adoptedWith: string;
}

export interface RequestGetPets {
    key?: string;
    name?: string;
    color?: string;
    age?: string;
    breed?: string;
    gender?: gender;
    behaviour?: string;
    weight?: number;

    sterilized?: boolean;
    vaccinated?: boolean;
    dewormed?: boolean;
    healthy?: boolean;
    identified?: boolean;
    microchipped?: boolean;

    adopted?: boolean;
    urgentAdoption?: boolean;
    adoptionPrice: number;
    deliveryPlace: string;

    contactedBy?: [{
        name: string;
        email: string;
        phoneNumber: string;
        interestedIn: contactAction;
        message: string;
        at: Date;
    }];

    statusOnShelter?: string;
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
    weight?: number;

    sterilized?: boolean;
    vaccinated?: boolean;
    dewormed?: boolean;
    healthy?: boolean;
    identified?: boolean;
    microchipped?: boolean;

    urgentAdoption?: boolean;
    adoptionPrice?: number;
    deliveryPlace?: string; 

    statusOnShelter: string;
    shelterKey: string;
    petTypeKey: string;
    adoptedWith: string;
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
    weight?: number;

    sterilized?: boolean;
    vaccinated?: boolean;
    dewormed?: boolean;
    healthy?: boolean;
    identified?: boolean;
    microchipped?: boolean;

    adopted?: boolean;
    urgentAdoption?: boolean;
    adoptionPrice?: number;
    deliveryPlace?: string;

    contactedBy?: [{
        name: string;
        email: string;
        phoneNumber: string;
        interestedIn: contactAction;
        message: string;
    }];

    statusOnShelter?: string;
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
        weight?: number;

        sterilized?: boolean;
        vaccinated?: boolean;
        dewormed?: boolean;
        healthy?: boolean;
        identified?: boolean;
        microchipped?: boolean;

        adopted?: boolean;
        urgentAdoption?: boolean;
        adoptionPrice?: number;
        deliveryPlace?: string;

        contactedBy?: [{
            name: string;
            email: string;
            phoneNumber: string;
            interestedIn: contactAction;
            message: string;
            at: Date;
        }];

        statusOnShelter?: string;
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
    weight?: number;
    
    sterilized?: boolean;
    vaccinated?: boolean;
    dewormed?: boolean;
    healthy?: boolean;
    identified?: boolean;
    microchipped?: boolean;
    
    adopted: boolean;
    urgentAdoption?: boolean;
    adoptionPrice?: number;
    deliveryPlace?: string;

    statusOnShelter: string;
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