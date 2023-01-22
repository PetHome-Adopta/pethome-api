import { RequestGetShelters, RequestCreateShelter, RequestUpdateShelter, RequestDeleteShelter, roles } from '../models/shelters';
import { helpers } from "../app";
import bcrypt from "bcryptjs";

export class SheltersServices {
    async getShelters(data: RequestGetShelters) {
        return await helpers.shelters.getShelters({
            filters: {
                key: data.key,
                phoneNumber: data.phoneNumber,
                email: data.email,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
    }

    async createShelter(data: RequestCreateShelter) {
        if (
            data.name == null ||
            data.phoneNumber == null ||
            data.email == null ||
            data.password == null ||
            data.address == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.phoneNumber) !== "string" ||
            typeof (data.email) !== "string" ||
            typeof (data.password) !== "string" ||
            typeof (data.address) !== "string"
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
                message: "SHelter alredy created or it's deleted"
            }

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        return await helpers.shelters.createShelter({
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
            address: data.address,
            description: data.description,
            imageURL: data.imageURL,
            role: data.role || roles.admin,
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
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                address: data.address,
                description: data.description,
                imageURL: data.imageURL,
                role: data.role,
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
                message: "Shelter doesn't exist"
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