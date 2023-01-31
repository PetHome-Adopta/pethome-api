import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

type gender = "male" | "female";
type contactAction = "adopt" | "foster" | "sponsor";
type deliveryPlace = "Consult" | "On shelter" | "Same city" | "Same area" | "Same country"

export interface Pet extends baseModel{
    _id: any;
    key: string;
    imageURL: string;
    litter: boolean;
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
    deliveryPlace: deliveryPlace;

    contactedBy?: [{
        name: string;
        email: string;
        phoneNumber: string;
        interestedIn: contactAction;
        message: string;
        at: Date;
    }];

    statusOnShelter: string;
    adoptedWith: [{
        key: string;
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
    adoptedWith: [{
        key: string;
    }];
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
    adoptedWith: [{
        key: string;
    }];
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