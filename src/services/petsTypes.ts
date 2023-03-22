import { helpers } from "../app";
import { RequestGetPetsTypes, RequesCreatePetsTypes, RequestUpdatePetsTypes, RequestDeletePetsTypes, PetType } from "../models/petsTypes";

export class PetsTypesServices {
    async getPetsType(data: RequestGetPetsTypes): Promise<[PetType[], number]> {
        const response = await helpers.petsTypes.getPetsTypes({
                filters: {
                    key: data.key,
                    name: data.name,
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

    async createPetType(data: RequesCreatePetsTypes): Promise<PetType> {
        if (data.name == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            };

        if (typeof (data.name) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const petType = await helpers.petsTypes.getPetsTypes({
            filters: {
                name: data.name,
                deletedAt: null
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

        const response: PetType = await helpers.petsTypes.createPetType({
            name: data.name
        });

        delete response._id;
        
        return response;
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
                key: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (petType[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "Pet type doesn't exist or it's deleted"
            }

        return await helpers.petsTypes.deletePetType({
            key: data.key,
        });
    }
}