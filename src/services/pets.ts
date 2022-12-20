import { RequestGetPets, RequestCreatePet, RequestUpdatePet, RequestDeletePet } from '../entities/models/pets';
import { helpers } from "../app";

export class PetsServices {
    async getPets(data: RequestGetPets) {

        return await helpers.pets.getPets({
            filters: {
                key: data.key,
                name: data.name,
                shelterKey: data.shelterKey,
                deletedAt: null
            },
            options: {
                sort: {_id: -1}
            }
        });
    }

    async createPet(data: RequestCreatePet) {
        return await helpers.pets.createPet({
            name: data.name,
            description: data.description,
            age: data.age,
            color: data.color,
            breed: data.breed,
            gender: data.gender,
            behaviour: data.behaviour,
            sterilized: data.sterilized,
            shelterKey: data.shelterKey,
            petTypeKey: data.petTypeKey,
            adopted: false,
        });
    }

    async updatePet(data: RequestUpdatePet) {
        if (typeof (data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.updatePet({
            filters: {
                key: data.key,
                shelterKey: data.shelterKey,
                petTypeKey: data.petTypeKey
            },
            data: {
                name: data.name,
                description: data.description,
                age: data.age,
                color: data.color,
                breed: data.breed,
                gender: data.gender,
                behaviour: data.behaviour,
                sterilized: data.sterilized,
                shelterKey: data.shelterKey,
                petTypeKey: data.petTypeKey
            }
        });
    }

    async deletePet(data: RequestDeletePet) {
        if (typeof (data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.pets.deletePet({
            key: data.key
        });
    }
}