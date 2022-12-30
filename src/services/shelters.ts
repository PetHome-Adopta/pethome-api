import { RequestGetShelters, RequestCreateShelter, RequestUpdateShelter, RequestDeleteShelter } from '../entities/models/shelters';
import { helpers } from "../app";

export class SheltersServices {
    async getShelters(data: RequestGetShelters) {

        return await helpers.shelters.getShelters({
            filters: {
                key: data.key,
                phoneNumber: data.phoneNumber,
                email: data.email,
            },
            options: {
                sort: {_id: -1}
            }
        });
    }

    async createShelter(data: RequestCreateShelter) {
        const shelter = await helpers.shelters.getShelters({
            filters: {
                phoneNumber: data.phoneNumber,
                email: data.email,
            },
            options: {
                sort: {_id: -1}
            }
        });
        if (shelter)
            throw {
                ok: false,
                status: 400,
                message: "SHelter alredy created"
            }
        
        return await helpers.shelters.createShelter({
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
            address: data.address,
            description: data.description,
            imageURL: data.imageURL,
            role: data.role,
        });
    }

    async updateShelter(data: RequestUpdateShelter) {
        return await helpers.shelters.updateShelter({
            filters: {
                key: data.key,
            },
            data: {
                //TODO: data.name ? data.name : legacyData.name -> at all ./services update method
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
        return await helpers.shelters.deleteShelter({
            key: data.key
        });
    }
}