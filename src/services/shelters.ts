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
        if (typeof (data.key) !== 'string')
            throw Error('Key type invalid');

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
        if (typeof (data.key) !== 'string')
            throw Error('Key type invalid');

        return await helpers.shelters.deleteShelter({
            key: data.key
        });
    }
}