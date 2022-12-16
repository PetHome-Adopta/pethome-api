import { CreatePetHelper, DeletePetHelper, GetPetsHelper, UpdatePetHelper } from '../entities/models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class PetsHelper {

    private databases: Databases;
    private collectionName: string = "pets";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getPets(options: GetPetsHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        //TODO: this.databases.getClients().mongo.collection("pets") -> deberia declararse aqui como variable global de la classe
        const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

        return [data, rCount];

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
        const updated = await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
            $set: {
                ...options.data,
                updatedAt: new Date(),
            }
        });

        return options;

    }

    async deletePet(options: DeletePetHelper) {

        const deleted = await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
            $set: {
                deletedAt: new Date(),
            }
        });

        return options;

    }

}