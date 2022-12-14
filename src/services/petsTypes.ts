import { helpers } from "../app";
import { RequestGetPetsTypes, CreatePetTypeHelper, UpdatePetTypeHelper, DeletePetTypeHelper } from "../entities/models/petsTypes";

export class PetsTypesServices {
    async getPetsType(data: RequestGetPetsTypes) {
        if(typeof(data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.getPetsType(data);
    }

    async createPetType(data: CreatePetTypeHelper) {
        return await helpers.pets.createPet(data);
    }

    async updatePetType(data: UpdatePetTypeHelper) {
        if(typeof(data.filters.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.updatePet(data);
    }

    async deletePetType(data: DeletePetTypeHelper) {
        if(typeof(data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.deletePet(data);
    }
}