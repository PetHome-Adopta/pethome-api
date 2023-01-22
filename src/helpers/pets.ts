import { CreatePetHelper, DeletePetHelper, GetPetsHelper, Pet, UpdatePetHelper } from '../models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class PetsHelper {

    private databases: Databases;
    private collectionName: string = "pets";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getPets(options: GetPetsHelper): Promise<[Pet[], number]> {
        options.filters = await DeserializerForMongoOptions(options.filters);
        try {
            const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
            const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);
            
            //TODO: refactor into utils static method?
            for(let element of data)
                delete element._id;

            return [data as any, rCount];

        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async createPet(options: CreatePetHelper) {

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
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async updatePet(options: UpdatePetHelper) {
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
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async deletePet(options: DeletePetHelper) {
        try{
            await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
                $set: {
                    deletedAt: new Date(),
                }
            });

            return options;
        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }
}