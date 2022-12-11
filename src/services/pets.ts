import { RequestGetPets } from "../entities/pets";

export class PetsServices {
    async getPets(data: RequestGetPets) {

        if(typeof(data.key) !== 'string')
            throw Error('Key type invalid');
    }
}