import { RequestGetPets, RequestCreatePet, RequestUpdatePet, RequestDeletePet } from '../models/pets';
import { helpers } from "../app";

export class PetsServices {
    async getPets(data: RequestGetPets) {

        return await helpers.pets.getPets({
            filters: {
                key: data.key,
                name: data.name,
                color: data.color,
                age: data.age,
                breed: data.breed,
                gender: data.gender,
                behaviour: data.behaviour,
                sterilized: data.sterilized,
                adopted: data.adopted,

                shelterKey: data.shelterKey,
                petTypeKey: data.petTypeKey,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
    }

    async createPet(data: RequestCreatePet) {
        if (data.name == null ||
            data.petTypeKey == null ||
            data.shelterKey == null ||
            data.description == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.name) !== "string" ||
            typeof (data.petTypeKey) !== "string" ||
            typeof (data.shelterKey) !== "string" ||
            typeof (data.description) !== "string"
        ) {
            throw {
                ok: false,
                status: 400,
                message: "Invalid data type"
            }
        }

        return await helpers.pets.createPet({
            name: data.name,
            description: data.description,
            age: data.age,
            color: data.color,
            breed: data.breed,
            gender: data.gender,
            behaviour: data.behaviour,
            sterilized: data.sterilized,
            adopted: false,

            shelterKey: data.shelterKey,
            petTypeKey: data.petTypeKey,
        });
    }

    async updatePet(data: RequestUpdatePet) {
        if (data.key == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const pet = await helpers.pets.getPets({
            filters: {
                key: data.key
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (pet[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet doesn't exist"
            }

        return await helpers.pets.updatePet({
            filters: {
                key: data.key,
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
                adopted: data.adopted,

                shelterKey: data.shelterKey,
                petTypeKey: data.petTypeKey
            }
        });
    }

    async deletePet(data: RequestDeletePet) {
        if (data.key == null)
            throw {
                ok: false,
                status: 400,
                message: 'Key type invalid'
            };

        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const pet = await helpers.pets.getPets({
            filters: {
                key: data.key
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (pet[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet doesn't exist"
            }

        return await helpers.pets.deletePet({
            key: data.key
        });
    }
}