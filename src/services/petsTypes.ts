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

        if (data.name == null) {
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }
        }

        return await helpers.petsTypes.createPetType({
            name: data.name
        });
    }

    async updatePetType(data: RequestUpdatePetsTypes) {
        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: 'Key type invalid'
            };

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
        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: 'Key type invalid'
            };

        return await helpers.petsTypes.deletePetType({
            key: data.key,
        });
    }
}