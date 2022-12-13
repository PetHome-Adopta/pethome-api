import { CreatePetHelper, DeletePetHelper, GetPetsHelper, UpdatePetHelper } from '../entities/models/pets';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid"; 


export class PetsHelper {

    private databases: Databases;
    private collectionOptions;

    constructor(databases: Databases) {
        this.databases = databases;
        this.collectionOptions = this.databases.getClients().mongo.collection("pets");
    }

    async getPets(options: GetPetsHelper) {
        //TODO: this.databases.getClients().mongo.collection("pets") -> deberia declararse aqui como variable global de la classe
        const data = await this.collectionOptions.find(options.filters, options.options).toArray();
        const rCount = await this.databases.getClients().mongo.collection("pets").countDocuments(options.filters);

        return [data, rCount];

    }

    async createPet(options: CreatePetHelper) {
        
        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
            adopted: false,
            /*
            TODO: no soy fan de esto, noto que añadiendo opciones directamente 
            al model entity de pet en el helper perdemos cohesion del controller 
            i añadimos acoplamiento al helper / pet model entity

            Me da la sensación que solo el controller deberia interactuar con el model,
            todos los datos deberian dar dados desde arriba, esta bien pensado? @Panta

            Quizas no sea mala idea añadir datos a la ultima capa ya que así viajará una menor carga de datos entre capas
            */
        }

        await this.databases.getClients().mongo.collection("pets").insertOne(toAdd);

        return toAdd;

    }

    async updatePet(options: UpdatePetHelper) {

        const updated = await this.databases.getClients().mongo.collection("pets").updateOne(options.filters, {
            data: options.data,
            updatedAt: new Date(),
        });

        return updated.upsertedId;

    }

    async deletePet(options: DeletePetHelper) {
        
        const deleted = await this.databases.getClients().mongo.collection("pets").updateOne(options, {
            deletedAt: new Date(),
        });

        return deleted.upsertedId;

    }

}