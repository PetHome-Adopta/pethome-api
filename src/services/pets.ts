import { CreatePetHelper, DeletePetHelper, RequestGetPets, UpdatePetHelper } from "../entities/models/pets";
import { helpers } from "../app";

export class PetsServices {
    async getPets(data: RequestGetPets) {
        if(typeof(data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.getPets(data);
    }

    async createPet(data: CreatePetHelper) {
        return await helpers.pets.createPet(data);
    }

    async updatePet(data: UpdatePetHelper) {
        if(typeof(data.filters.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.updatePet(data);
    }

    async deletePet(data: DeletePetHelper) {
        if(typeof(data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.deletePet(data);
    }
}