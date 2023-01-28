import { RequestGetPets, RequestCreatePet, RequestUpdatePet, RequestDeletePet } from '../models/pets';
import { helpers } from "../app";

export class PetsServices {
    async getPets(data: RequestGetPets) {
        const response = await helpers.pets.getPets({
            filters: {
                key: data.key,
                name: data.name,
                color: data.color,
                age: data.age,
                breed: data.breed,
                gender: data.gender,
                behaviour: data.behaviour,
                sterilized: data.sterilized,
                vaccinated: data.vaccinated,
                dewormed: data.dewormed,
                healthy: data.healthy,
                identified: data.identified,
                microchipped: data.microchipped,

                adopted: data.adopted,
                urgentAdoption: data.urgentAdoption,

                statusOnShelter: data.statusOnShelter,
                shelterKey: data.shelterKey,
                petTypeKey: data.petTypeKey,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });

        //TODO: refactor into utils static method?
        for(let element of response[0])
            delete element._id;

        return response;
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

        //TODO: refactor into utils.ts static method
        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                key: data.petTypeKey,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });

        if(petType[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet type doesn't exist or it's deleted"
            }

        const shelter = await helpers.shelters.getShelters({
            filters: {
                key: data.shelterKey,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });

        if(shelter[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Shelter doesn't exist or it's deleted"
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
            vaccinated: data.vaccinated,
            dewormed: data.dewormed,
            healthy: data.healthy,
            identified: data.identified,
            microchipped: data.microchipped,

            adopted: false,
            urgentAdoption: data.urgentAdoption,

            statusOnShelter: data.statusOnShelter,
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

        //TODO: refactor into utils.ts static method
        if(data.petTypeKey){
            const petType = await helpers.petsTypes.getPetsTypes({
                filters: {
                    key: data.petTypeKey,
                    deletedAt: null
                },
                options: {
                    sort: { _id: -1 }
                }
            });

            if(petType[1] === 0)
                throw {
                    ok: false,
                    status: 400,
                    message: "Pet type doesn't exist or it's deleted"
                }    
        }
        
        if(data.shelterKey){
            const shelter = await helpers.shelters.getShelters({
                filters: {
                    key: data.shelterKey,
                    deletedAt: null
                },
                options: {
                    sort: { _id: -1 }
                }
            });

            if(shelter[1] === 0)
                throw {
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exist or it's deleted"
                }    
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
                vaccinated: data.vaccinated,
                dewormed: data.dewormed,
                healthy: data.healthy,
                identified: data.identified,
                microchipped: data.microchipped,

                adopted: data.adopted,
                urgentAdoption: data.urgentAdoption,

                statusOnShelter: data.statusOnShelter,
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
                key: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (pet[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet doesn't exist or it's deleted"
            }

        return await helpers.pets.deletePet({
            key: data.key
        });
    }
}