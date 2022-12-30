import { CreateShelterHelper, DeleteShelterHelper, GetSheltersHelper, Shelter, UpdateShelterHelper } from '../entities/models/shelters';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class SheltersHelper {

    private databases: Databases;
    private collectionName: string = "shelters";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getShelters(options: GetSheltersHelper): Promise<[Shelter[], number]> {
        options.filters = await DeserializerForMongoOptions(options.filters);

        try {
            const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
            const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

            return [data as any, rCount];
        } catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({
                ok: false,
                message: (e.message || "Database error"),
            }));
        }
    }

    async createShelter(options: CreateShelterHelper) {
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

    async updateShelter(options: UpdateShelterHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        try {
            await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
                $set: {
                    ...options.data,
                    updatedAt: new Date(),
                }
            });

            return options;
        } catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({
                ok: false,
                message: (e.message || "Database error"),
            }));
        }
    }

    async deleteShelter(options: DeleteShelterHelper) {
        try {
            await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
                $set: {
                    deletedAt: new Date(),
                }
            });

            return options;
        } catch (e) {
            console.log(e);
            throw new Error(JSON.stringify({
                ok: false,
                message: (e.message || "Database error"),
            }));
        }
    }
}