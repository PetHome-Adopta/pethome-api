import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { LoginHelper } from "../entities/models/auth";


export class AuthHelper {

    private databases: Databases;
    private collectionName: string = "shelters";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async Login(options: LoginHelper) {

        try {
            return await this.databases.getClients().mongo.collection(this.collectionName).findOne(options.filters, options.options);
        } 
        catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }
}