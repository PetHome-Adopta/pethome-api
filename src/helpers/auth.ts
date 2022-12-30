import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { LoginHelper, RegisterHelper } from "../entities/models/auth";


export class AuthHelper {

    private databases: Databases;
    private collectionName: string = "shelter";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async Login(options: LoginHelper) {

        try {
            const data = await this.databases.getClients().mongo.collection(this.collectionName).findOne(options.filters, options.options);
            return data;
        } 
        catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({
                ok: false,
                message: (e.message || "Database error"),
            }));
        }
    }

    async Register(options: RegisterHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        try {
            await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);
            return toAdd;
        } catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({
                ok: false,
                message: (e.message || "Database error"),
            }));
        }
    }
}