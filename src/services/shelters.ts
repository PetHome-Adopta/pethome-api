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
        if (data.phoneNumber == null || 
            data.email == null || 
            data.password == null ||
            data.address == null ||
            data.role == null) 
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

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
        if (data.key == null) 
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }
        
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
        if (data.key == null) 
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }
            
        return await helpers.shelters.deleteShelter({
            key: data.key
        });
    }
}