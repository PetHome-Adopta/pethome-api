import { baseModel } from "./baseModel";
import { generalOptions } from "../mongodb";

type roles = "USER" | "ADMIN"; // Differences?

export interface RequestGetShelters {
    key?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
}

export interface GetSheltersHelper extends generalOptions {
    filters: {
        key?: string;
        phoneNumber?: string;
        email?: string;
        address?: string;
    }
}

export interface Shelter extends baseModel{
    key: string;
    phoneNumber: string;
    email: string;
    password?: string;
    address: string;
    description?: string;
    imageURL?: string;
    role: roles;
}

export interface CreateShelterHelper {
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    description?: string;
    imageURL?: string;
    role?: roles;
}

export interface UpdateShelterHelper {
    data: CreateShelterHelper,
    filters: GetSheltersHelper["filters"]
}

export interface DeleteShelterHelper {
    key?: string;
    _id?: string;
}