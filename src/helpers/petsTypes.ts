import { CreatePetHelper, DeletePetHelper, GetPetsHelper, UpdatePetHelper } from '../models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { CreatePetTypeHelper, DeletePetTypeHelper, GetPetsTypesHelper, PetType, RequesCreatePetsTypes, UpdatePetTypeHelper } from '../models/petsTypes';
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class PetsTypesHelper {

    private databases: Databases;
    private collectionName: string = "petsTypes";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getPetsTypes(options: GetPetsTypesHelper): Promise<[PetType[], number]> {
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

    async createPetType(options: CreatePetTypeHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date()
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

    async updatePetType(options: UpdatePetTypeHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        
        try{
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

    async deletePetType(options: DeletePetTypeHelper) {
        try {
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