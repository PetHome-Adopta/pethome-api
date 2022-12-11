import { CreatePetHelper, DeletePetHelper, GetPetsHelper, UpdatePetHelper } from '../entities/models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid"; 


export class PetsHelper {

    private databases: Databases;

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getPets(options: GetPetsHelper) {

        const data = await this.databases.getClients().mongo.collection("pets").find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection("pets").countDocuments(options.filters);

        return [data, rCount];

    }

    async createPet(options: CreatePetHelper) {
        
        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            adopted: false,
        }

        await this.databases.getClients().mongo.collection("pets").insertOne(toAdd);

        return toAdd;

    }

    async updatePet(options: UpdatePetHelper) {

        const updated = await this.databases.getClients().mongo.collection("pets").updateOne(options.filters, options.data);

        return updated.upsertedId;

    }

    async deletePet(options: DeletePetHelper) {
        
        const deleted = await this.databases.getClients().mongo.collection("pets").updateOne(options, {
            deletedAt: new Date()
        });

        return deleted.upsertedId;

    }

}