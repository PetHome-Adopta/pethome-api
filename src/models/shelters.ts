import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

export interface Shelter extends baseModel{
    _id: any;
    key: string;
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    imageURL: string;
}

export interface RequestGetShelters {
    key?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    description?: string;
    imageURL?: string;
}

export interface RequestCreateShelter {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    imageURL?: string;
}

export interface RequestUpdateShelter {
    password: any;
    role: any;
    key: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
    address?: string;
    description?: string;
    imageURL?: string;
}

export interface RequestDeleteShelter {
    key: string;
}

export interface GetSheltersHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
        email?: string;
        phoneNumber?: string;
        address?: string;
        description?: string;
        imageURL?: string;
        deletedAt?: Date;
    }
}

export interface CreateShelterHelper {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    description: string;
    imageURL?: string;
}

export interface UpdateShelterHelper {
    data: CreateShelterHelper,
    filters: GetSheltersHelper["filters"]
}

export interface DeleteShelterHelper {
    key: string;
}