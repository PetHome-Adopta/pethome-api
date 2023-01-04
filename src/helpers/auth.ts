import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';
import { LoginHelper, RegisterHelper } from "../models/auth";


export class AuthHelper {

    private databases: Databases;
    private collectionName: string = "shelter";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async Login(options: LoginHelper) {

        const data = await this.databases.getClients().mongo.collection(this.collectionName).findOne(options.filters, options.options);

        return data;

    }

    async Register(options: RegisterHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);

        return toAdd;

    }

}