
import App, { services } from "../app";

let server;

beforeAll(async () => {
    server = await App;
  })

describe('pets', () => {
    describe('Get pets', () => {
        it('It should return data as array', async () => {
            const data = await services.pets.getPets({});
            expect(data).toBeInstanceOf(Array);
        });

        it('It should return that the returned data is larger than 0', async () => {
            const data = await services.pets.getPets({});
            expect(data?.[0]?.length > 0).toBe(true);
        });

        it('It should return that the returned data is equal to count', async () => {
            const data = await services.pets.getPets({});
            expect(data?.[0]?.length == data?.[1]).toBe(true);
        });

        it('It should return that the returned data is 0 when pet does not exists', async () => {
            const data = await services.pets.getPets({key: "test"});
            expect(data?.[0]?.length == 0).toBe(true);
        });
    });
    
    describe('Create pets', () => {
        //TODO: x 1- se crea y te devuelve los datos que tocan
        //TODO: 2- se crea y el contador ha subido
        //TODO: 3- se crea y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados

        //TODO: DUDA - el shelterKey y el petTypeKey iran variando para cada una de las personas que tengans la bbdd en local -> uuid, como podemos unificarlo?
        it('It should return the created object', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name",
                    shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                    petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                    litter: true
                } as any);
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should error on not sending required value', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name"
                } as any);
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });
        
    });
    
    //TODO: describe update pets
        //TODO: 1- se actualiza y te devuelve los datos que tocan
        //TODO: 2- se actualiza y el contador es el mismo
        //TODO: 3- se actualiza y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados
        

    //TODO: describe delete pets
        //TODO: 1- se elimina y te devuelve los datos que tocan
        //TODO: 2- se elimina y el contador es uno menos
        //TODO: 3- se elimina y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados
        //TODO: user is not logged
        //TODO: user is logged
});