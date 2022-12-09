import { Databases } from "../infrastructure/databases/databases";
import { Db } from 'mongodb';

export interface infrastructure {
    databases: Databases
}

export interface databases {
    mongo: Db
}