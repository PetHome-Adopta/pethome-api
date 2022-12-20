
import App, { services } from "../app";

let server;

beforeAll(async () => {
    server = await App;
  })

describe('shelters', () => {
    describe('Create shelters', () => {
        it('It should return an error at create because there are no params', async () => {
            try {

                await services.shelters.createShelter({} as any);
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

                await services.shelters.createShelter({
                    phoneNumber: "test",
                    email: "test",
                    password: "test",
                    address: "test",
                    description: "test",
                    imageURL: "test",
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
    describe('Create shelters', () => {
        it('It should return data as array', async () => {
            const shelter = await services.shelters.getShelters({});
            expect(shelter).toBeInstanceOf(Array)
            
        });

        it('It should return that the returned data is larger than 0', async () => {
            const shelter = await services.shelters.getShelters({});
            expect(shelter?.[0]?.length > 0).toBe(true)
            
        });
    });
});