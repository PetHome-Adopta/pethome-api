import { CreatePetHelper, DeletePetHelper, GetPetsHelper, Pet, UpdatePetHelper } from '../entities/models/pets';
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
        
        const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

        return [data as any, rCount];

    }

    async createPet(options: CreatePetHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);

        return toAdd;

    }

    async updatePet(options: UpdatePetHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
            $set: {
                ...options.data,
                updatedAt: new Date(),
            }
        });

        return options;

    }

    async deletePet(options: DeletePetHelper) {

        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
            $set: {
                deletedAt: new Date(),
            }
        });

        return options;

    }

}