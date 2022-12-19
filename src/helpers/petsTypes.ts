import { CreatePetHelper, DeletePetHelper, GetPetsHelper, UpdatePetHelper } from '../entities/models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { CreatePetTypeHelper, DeletePetTypeHelper, GetPetsTypesHelper, RequesCreatePetsTypes, UpdatePetTypeHelper } from '../entities/models/petsTypes';
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class PetsTypesHelper {

    private databases: Databases;
    private collectionName: string = "petsTypes";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getPetsTypes(options: GetPetsTypesHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        
        const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

        return [data, rCount];

    }

    async createPetType(options: CreatePetTypeHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);

        return toAdd;

    }

    async updatePetType(options: UpdatePetTypeHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
            $set: {
                ...options.data,
                updatedAt: new Date(),
            }
        });

        return options;

    }

    async deletePetType(options: DeletePetTypeHelper) {

        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
            $set: {
                deletedAt: new Date(),
            }
        });

        return options;

    }

}