
import App, { services } from "../app";

let server;

beforeAll(async () => {
    server = await App;
  })

describe('pets', () => {
    describe('Create pets', () => {
        it('It should return an error at create because there are no params', async () => {
            try {

                await services.pets.createPet({} as any);
                fail();
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 403,
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
                fail();
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 403,
                    message: "There are required values that don't have a valid value"
                });
            }
            
        });
    });
    describe('Create pets', () => {
        it('It should return data as array', async () => {
            const pet = await services.pets.getPets({});
            expect(pet).toBeInstanceOf(Array)
            
        });

        it('It should return that the returned data is larger than 0', async () => {
            const pet = await services.pets.getPets({});
            expect(pet?.[0]?.length > 0).toBe(true)
            
        });
    });
});