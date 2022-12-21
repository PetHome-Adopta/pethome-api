import { helpers } from "../app";
import { RequestGetPetsTypes, RequesCreatePetsTypes, RequestUpdatePetsTypes, RequestDeletePetsTypes } from "../entities/models/petsTypes";

export class PetsTypesServices {
    async getPetsType(data: RequestGetPetsTypes) {

        return await helpers.petsTypes.getPetsTypes({
            filters: {
             key: data.key,
             name: data.name   
            },
            options: {
                sort: {_id: -1}
            }
        });
    }

    async createPetType(data: RequesCreatePetsTypes) {
        return await helpers.petsTypes.createPetType({
            name: data.name
        });
    }

    async updatePetType(data: RequestUpdatePetsTypes) {
        if(typeof(data.key) !== 'string')
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
        if(typeof(data.key) !== 'string')
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