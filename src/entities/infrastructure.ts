import { Databases } from "../infrastructure/databases/databases";
import { Db } from 'mongodb';
import { JWTInfrastructure } from "../infrastructure/JWT";

export interface infrastructure {
    databases: Databases,
    jwt: JWTInfrastructure
}

export interface databases {
    mongo: Db
}