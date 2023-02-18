
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
        //TODO: user is not logged
        it('User is not logged', async () => {
            try {
                await services.pets.createPet({} as any);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
            
        });

        //TODO user is logged
        it('It should return an error at create because there are no params', async () => {
            try {
                await services.pets.createPet({} as any);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
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
    });
    //TODO: describe update pets
    //TODO: describe delete pets
});