import App, { services } from "../app";
import { PetType } from "../models/petsTypes";
let server;

beforeAll(async () => {
    server = await App;
});

afterAll (async () => {
    if (server) {
        server.close();
    }
});

describe('petsTypes', () => {
    describe('Get pets types', () => {
        it('It should return data as array', async () => {
            const data = await services.petsTypes.getPetsType({});
            expect(data).toBeInstanceOf(Array);
        });

        it('It should return that the returned data is larger than 0', async () => {
            const data = await services.petsTypes.getPetsType({});
            expect(data?.[0]?.length > 0).toBe(true);
        });

        it('It should return that the returned data is equal to count', async () => {
            const data = await services.petsTypes.getPetsType({});
            expect(data?.[0]?.length == data?.[1]).toBe(true);
        });

        it('It should return that the returned data is 0 when pet type does not exists', async () => {
            const data = await services.petsTypes.getPetsType({key: "eavjwevbwebn"});
            expect(data?.[0]?.length == 0).toBe(true);
        });

        it('It should return objects without "_id"', async () => {
            const data = await services.petsTypes.getPetsType({});
            expect(data?.[0]?.[0]?._id == null).toBe(true);
        });
    });

    describe('Create pet type', () => {
        it('It should return the created object', async () => {
            const data = await services.petsTypes.createPetType({
                name: "Test name 3",
            } as PetType);

            expect(data.name == "Test name 3").toBe(true);
        });

        it('It should return the created object without "_id"', async () => {
            const data = await services.petsTypes.createPetType({
                name: "Test name 4"
            } as PetType);

            expect(data?._id == null).toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add +1 to the total count', async () => {
            const dataCountBefore = await services.petsTypes.getPetsType({});
            await services.petsTypes.createPetType({
                name: "Test name 5"
            } as PetType);
            const dataCountAfter = await services.petsTypes.getPetsType({});

            expect(dataCountAfter[1] == dataCountBefore[1] + 1).toBe(true);
        });

        //TODO: Este test tampoco pasa con ninguno de los expects -> Pet es una interfaz
        //https://stackoverflow.com/questions/46703364/why-does-instanceof-in-typescript-give-me-the-error-foo-only-refers-to-a-ty
        it('It should return an instance of Pet', async () => {
            const data: PetType = await services.petsTypes.createPetType({
                name: "Test name2"
            } as PetType);
        
            expect(data as PetType).toBe(true);
            //expect(data).toBeInstanceOf(Pet);
        });

        it('It should return error on not sending required value', async () => {
            try {
                await services.petsTypes.createPetType({
                    name: null
                } as PetType);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that pet type is alredy created', async () => {
            try {
                await services.petsTypes.createPetType({
                    name: "Test name"
                } as PetType);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Pet type alredy created"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.petsTypes.createPetType({
                    name: 123
                } as any);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Invalid data type"
                });
            }
        });
    });
});