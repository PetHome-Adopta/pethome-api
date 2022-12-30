import { baseModel } from "./baseModel";
import { generalOptions } from "../mongodb";

type roles = "USER" | "ADMIN"; // TODO: Differences?

export interface RequestGetShelters {
    key?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
}

export interface RequestCreateShelter {
    phoneNumber: string;
    email: string;
    password: string;
    address: string;
    description?: string;
    imageURL?: string;
    role: roles;
}

export interface RequestUpdateShelter {
    key: string;
    password?: string;
    phoneNumber?: string;
    email?: string;
    address?: string;
    description?: string;
    imageURL?: string;
    role?: roles;
}

export interface RequestDeleteShelter {
    key: string;
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
    password: string;
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
    role: roles;
}

export interface UpdateShelterHelper {
    data: CreateShelterHelper,
    filters: GetSheltersHelper["filters"]
}

export interface DeleteShelterHelper {
    key: string;
}