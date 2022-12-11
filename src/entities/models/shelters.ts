import { baseModel } from "./baseModel";
import { generalOptions } from "../mongodb";

type roles = "USER" | "ADMIN";

export interface RequestGetShelters {
    key?: string;
    username?: string;
    email?: string;
}

export interface GetSheltersHelper extends generalOptions {
    filters: {
        key?: string;
        username?: string;
        email?: string;
    }
}

export interface Shelter extends baseModel{
    key: string;
    username: string;
    email: string;
    password: string;
    address: string;
    description: string;

    pets?: string;
    role: roles;
}

export interface CreateShelterHelper {
    username: string;
    email: string;
    password: string;
    address: string;
    description: string;
}

export interface UpdateShelterHelper {
    data: CreateShelterHelper,
    filters: GetSheltersHelper["filters"]
}

export interface DeleteShelterHelper {
    key?: string;
    username?: string;
    email?: string;
    _id?: string;
}