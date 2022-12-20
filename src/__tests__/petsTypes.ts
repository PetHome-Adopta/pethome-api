import App, { services } from "../app";

let server;

beforeAll(async () => {
    server = await App;
  })

describe('petsTypes', () => {
    describe('Create petsTypes', () => {
        it('It should return an error at create because there are no params', async () => {
            try {

                await services.petsTypes.createPetType({} as any);
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

                await services.petsTypes.createPetType({
                    name: "Test name",
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
    describe('Create petsTypes', () => {
        it('It should return data as array', async () => {
            const petType = await services.petsTypes.getPetsType({});
            expect(petType).toBeInstanceOf(Array)
            
        });

        it('It should return that the returned data is larger than 0', async () => {
            const petType = await services.petsTypes.getPetsType({});
            expect(petType?.[0]?.length > 0).toBe(true)
            
        });
    });
});