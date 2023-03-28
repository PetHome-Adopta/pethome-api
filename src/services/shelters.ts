import { RequestGetShelters, RequestCreateShelter, RequestUpdateShelter, RequestDeleteShelter, Shelter } from '../models/shelters';
import { helpers } from "../app";

export class SheltersServices {
    async getShelters(data: RequestGetShelters): Promise<[Shelter[], number]> {
        const response = await helpers.shelters.getShelters({
                filters: {
                    key: data.key,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    address: data.address,
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

    async createShelter(data: RequestCreateShelter): Promise<Shelter> {
        if (
            data.name == null ||
            data.phoneNumber == null ||
            data.email == null ||
            data.address == null ||
            data.description == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.phoneNumber) !== "string" ||
            typeof (data.email) !== "string" ||
            typeof (data.address) !== "string" ||
            typeof (data.phoneNumber) !== "string" ||
            typeof (data.description) !== "string"
        ) {
            throw {
                ok: false,
                status: 400,
                message: "Invalid data type"
            }
        }

        const shelter = await helpers.shelters.getShelters({
            filters: {
                phoneNumber: data.phoneNumber,
                email: data.email,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (shelter[1] > 0)
            throw {
                ok: false,
                status: 400,
                message: "Shelter alredy created"
            }

        return await helpers.shelters.createShelter({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            address: data.address,
            description: data.description,
            imageURL: data.imageURL
        });
    }

    async updateShelter(data: RequestUpdateShelter) {
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
            };

        const shelter = await helpers.shelters.getShelters({
            filters: {
                key: data.key,
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (shelter[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Shelter doesn't exist or it's deleted"
            }

        return await helpers.shelters.updateShelter({
            filters: {
                key: data.key,
            },
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                email: data.email,
                address: data.address,
                description: data.description,
                imageURL: data.imageURL,
            }
        });
    }

    async deleteShelter(data: RequestDeleteShelter) {
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

        const shelter = await helpers.shelters.getShelters({
            filters: {
                key: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (shelter[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Shelter doesn't exists"
            }

        const pets = await helpers.pets.getPets({
            filters: {
                shelterKey: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });

        for (let pet of pets[0]) {
            console.log('Deleting pet: ', pet.key);
            await helpers.pets.deletePet({
                key: pet.key
            });
        }

        return await helpers.shelters.deleteShelter({
            key: data.key
        });
    }
}