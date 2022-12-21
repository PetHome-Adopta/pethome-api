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

        const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

        return [data as any, rCount];

    }

    async createShelter(options: CreateShelterHelper) {

        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);

        return toAdd;

    }

    async updateShelter(options: UpdateShelterHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
            $set: {
                ...options.data,
                updatedAt: new Date(),
            }
        });

        return options;

    }

    async deleteShelter(options: DeleteShelterHelper) {

        await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
            $set: {
                deletedAt: new Date(),
            }
        });

        return options;

    }

}