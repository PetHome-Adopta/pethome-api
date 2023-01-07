import { generalOptions } from "../entities/mongodb";


export interface RequestLogin {
    email: string;
    password: string;
}

export interface LoginHelper extends generalOptions {
    filters: {
        email: string;
        deletedAt?: Date;
    }
}