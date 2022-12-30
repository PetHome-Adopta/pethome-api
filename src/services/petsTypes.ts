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
                sort: { _id: -1 }
            }
        });
    }

    async createPetType(data: RequesCreatePetsTypes) {
        //TODO: check if pet is alredy created? which field can we check?
        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                name: data.name
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (petType)
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
        if (data.key == null)
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
        if (data.key == null)
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