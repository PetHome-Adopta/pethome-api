import { helpers } from "../app";
import { RequestGetPetsTypes, RequesCreatePetsTypes, RequestUpdatePetsTypes, RequestDeletePetsTypes } from "../models/petsTypes";

export class PetsTypesServices {
    async getPetsType(data: RequestGetPetsTypes) {
        return await helpers.petsTypes.getPetsTypes({
            filters: {
                key: data.key,
                name: data.name
            },
            options: {
                sort: { _id: -1 }
            }
        });
    }

    async createPetType(data: RequesCreatePetsTypes) {
        if (data.name == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            };

        //TODO: es necesario comprobar al crear la entidad?
        if (typeof (data.name) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        //TODO: check if pet is alredy created? which field can we check?
        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                name: data.name
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (petType[1] > 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet type alredy created"
            }

        return await helpers.petsTypes.createPetType({
            name: data.name
        });
    }

    async updatePetType(data: RequestUpdatePetsTypes) {
        if (data.key == null || data.name == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            };

        if (typeof (data.key) !== 'string' || typeof (data.name) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                key: data.key
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (petType[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet type doesn't exist"
            }

        return await helpers.petsTypes.updatePetType({
            data: {
                name: data.name
            },
            filters: {
                key: data.key
            }
        });
    }

    async deletePetType(data: RequestDeletePetsTypes) {
        if (data.key == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            };

        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                key: data.key
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (petType[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet type doesn't exist"
            }

        return await helpers.petsTypes.deletePetType({
            key: data.key,
        });
    }
}