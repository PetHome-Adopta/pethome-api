import { baseModel } from "./baseModel";
import { generalOptions } from "../entities/mongodb";

//TODO: 1- Mejorar esto si se puece unificar
export const roles = {user: "USER", shelter: "SHELTER", admin: "ADMIN"};
export type roles = "USER" | "SHELTER" | "ADMIN";

export interface User extends baseModel{
    _id: any;
    key: string;
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    description: string;
    imageURL: string;
    preferedCoin: string;
    role: roles;
    shelterKey: string[];
}

export interface RequestGetUsers {
    key?: string;
    name?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    description?: string;
    imageURL?: string;
    preferedCoin?: string;
    role?: roles;
    shelterKey?: string[];
}

export interface RequestCreateUser {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    description: string;
    imageURL?: string;
    preferedCoin?: string;
    role: roles;
    shelterKey?: string[];
}

export interface RequestUpdateUser {
    address: any;
    key: string;
    name?: string;
    phoneNumber?: string;
    email?: string;
    password?: string;
    description?: string;
    imageURL?: string;
    preferedCoin?: string;
    role?: roles;
    shelterKey?: string[];
}

export interface RequestDeleteUser {
    key: string;
}

export interface GetUsersHelper extends generalOptions {
    filters: {
        key?: string;
        name?: string;
        phoneNumber?: string;
        email?: string;
        password?: string;
        description?: string;
        imageURL?: string;
        preferedCoin?: string;
        role?: roles;
        shelterKey?: string[];
        deletedAt?: Date;
    }
}

export interface CreateUserHelper {
    name: string;
    phoneNumber: string;
    email: string;
    password: string;
    description: string;
    imageURL?: string;
    preferedCoin?: string;
    role: roles;
    shelterKey?: string[];
}

export interface UpdateUserHelper {
    data: CreateUserHelper,
    filters: GetUsersHelper["filters"]
}

export interface DeleteUserHelper {
    key: string;
}