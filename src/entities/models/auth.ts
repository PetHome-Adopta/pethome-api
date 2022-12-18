import { generalOptions } from "../mongodb";
import { CreateShelterHelper } from "./shelters";


export interface RequestLogin {
    email: string;
    password: string;
}

export interface RequestRegister extends CreateShelterHelper{}

export interface LoginHelper extends generalOptions {
    filters: {
        email: string;
        deletedAt?: Date;
    }
}

export interface RegisterHelper extends RequestRegister{};