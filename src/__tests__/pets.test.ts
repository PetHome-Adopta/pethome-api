
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
        //TODO: 1- se crea y te devuelve los datos que tocan
        //TODO: 2- se crea y el contador ha subido
        //TODO: 3- se crea y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados

        //TODO: user is not logged
        it('User is not logged', async () => {
            try {
                await services.pets.createPet({} as any);
            }
            catch(e) {
                console.log("Error: ", e);
                expect(e).toEqual({
                    ok: false,
                    status: 403
                });
            }
            
        });
        /*
        it('User is logged', async () => {
            try {
                await services.pets.createPet({} as any);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: true,
                    status: 200
                });
            }
            
        });
        it('It should return the created object', async () => {
            try {

                await services.pets.createPet({
                    name: "Test name",
                    shalterKey: "",
                    petTypeKey: ""
                } as any);
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });
        */
    });
    //TODO:poner aws cuenta en android
    //TODO: describe update pets
        //TODO: 1- se actualiza y te devuelve los datos que tocan
        //TODO: 2- se actualiza y el contador es el mismo
        //TODO: 3- se actualiza y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados
        //TODO: user is not logged
        //TODO: user is logged

    //TODO: describe delete pets
        //TODO: 1- se elimina y te devuelve los datos que tocan
        //TODO: 2- se elimina y el contador es uno menos
        //TODO: 3- se elimina y te devuelve la instacia de pet -> modificar en controller, service, helper
        //TODO: 4- test por cada uno de los errores controlados
        //TODO: user is not logged
        //TODO: user is logged
});