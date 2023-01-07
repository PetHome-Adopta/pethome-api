import { generalOptions } from "../mongodb";


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