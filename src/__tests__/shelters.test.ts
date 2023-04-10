import App, { services } from "../app";
import { Shelter } from "../models/shelters";
let server;

beforeAll(async () => {
    server = await App;
});

afterAll (async () => {
    if (server) {
        server.close();
    }
});

describe('shelters', () => {
    describe('Get shelters', () => {
        it('It should return data as array', async () => {
            const data = await services.shelters.getShelters({});
            expect(data).toBeInstanceOf(Array);
        });

        it('It should return that the returned data is larger than 0', async () => {
            const data = await services.shelters.getShelters({});
            expect(data?.[0]?.length > 0).toBe(true);
        });

        it('It should return that the returned data is equal to count', async () => {
            const data = await services.shelters.getShelters({});
            expect(data?.[0]?.length == data?.[1]).toBe(true);
        });

        it('It should return that the returned data is 0 when shelter does not exists', async () => {
            const data = await services.shelters.getShelters({key: "eavjwevbwebn"});
            expect(data?.[0]?.length == 0).toBe(true);
        });

        it('It should return objects without "_id"', async () => {
            const data = await services.shelters.getShelters({});
            expect(data?.[0]?.[0]?._id == null).toBe(true);
        });
    });

    describe('Create shelter', () => {
        it('It should return the created object', async () => {
            const data = await services.shelters.createShelter({
                name: "testName",
                phoneNumber: "1234",
                email: "test1@test.com",
                address: "carrer1",
                description: "description",
                imageURL: "imageTest"
            } as Shelter);

            expect(data.name == "Test name").toBe(true);
        });

        it('It should return the created object without "_id"', async () => {
            const data = await services.shelters.createShelter({
                name: "testName",
                phoneNumber: "1234",
                email: "test2@test.com",
                address: "carrer1",
                description: "description",
                imageURL: "imageTest"
            } as Shelter);

            expect(data?._id == null).toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add +1 to the total count', async () => {
            const dataCountBefore = await services.shelters.getShelters({});
            await services.shelters.createShelter({
                name: "testName",
                phoneNumber: "1234",
                email: "test3@test.com",
                address: "carrer1",
                description: "description",
                imageURL: "imageTest"
            } as Shelter);
            const dataCountAfter = await services.shelters.getShelters({});

            expect(dataCountAfter[1] == dataCountBefore[1] + 1).toBe(true);
        });

        //TODO: Este test tampoco pasa con ninguno de los expects -> Pet es una interfaz
        //https://stackoverflow.com/questions/46703364/why-does-instanceof-in-typescript-give-me-the-error-foo-only-refers-to-a-ty
        it('It should return an instance of shelter', async () => {
            const data: Shelter = await services.shelters.createShelter({
                name: "testName",
                phoneNumber: "1234",
                email: "test4@test.com",
                address: "carrer1",
                description: "description",
                imageURL: "imageTest"
            } as Shelter);
        
            expect(data as Shelter).toBe(true);
            //expect(data).toBeInstanceOf(Pet);
        });

        it('It should return error on not sending required value', async () => {
            try {
                await services.shelters.createShelter({
                    phoneNumber: "1234",
                    email: "test3@test.com",
                    address: "carrer1",
                    description: "description",
                    imageURL: "imageTest"
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that shelter is alredy created', async () => {
            try {
                await services.shelters.createShelter({
                    name: "testName",
                    phoneNumber: "1234",
                    email: "test@test.com",
                    address: "carrer1",
                    description: "description",
                    imageURL: "imageTest"
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Shelter alredy created"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.shelters.createShelter({
                    name: 12345,
                    phoneNumber: "1234",
                    email: "test3@test.com",
                    address: "carrer1",
                    description: "description",
                    imageURL: "imageTest"
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

    describe('Update shelter', () => {
        it('It should return the updated object', async () => {
            const data = await services.shelters.updateShelter({
                key: "03059fe0-d26a-11ed-ab22-cf06f4bbc2cd",
                name: "Test name 3",
            } as Shelter);

            expect(data.data.name == "Test name 3").toBe(true);
            expect(data.filters.key == "03059fe0-d26a-11ed-ab22-cf06f4bbc2cd").toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should be the same total count', async () => {
            const dataCountBefore = await services.shelters.getShelters({});
            await services.shelters.updateShelter({
                key: "03059fe0-d26a-11ed-ab22-cf06f4bbc2cd",
                name: "Test name 5"
            } as Shelter);
            const dataCountAfter = await services.shelters.getShelters({});

            expect(dataCountAfter[1] == dataCountBefore[1]).toBe(true);
        });


        it('It should return error on not sending required value', async () => {
            try {
                await services.shelters.updateShelter({
                    key: null
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that shelter doesnt exists', async () => {
            try {
                await services.shelters.updateShelter({
                    key: "12345"
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exists"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.shelters.updateShelter({
                    key: 1234
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

    describe('Delete shelter', () => {
        it('It should return the deleted object', async () => {
            const data = await services.shelters.deleteShelter({
                key: "03059fe0-d26a-11ed-ab22-cf06f4bbc2cd"
            } as Shelter);

            expect(data.key == "03059fe0-d26a-11ed-ab22-cf06f4bbc2cd").toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add -1 to the total count', async () => {
            const dataCountBefore = await services.shelters.getShelters({});
            await services.shelters.deleteShelter({
                key: "c4f09ef0-ae4a-11ed-87c7-63a3ebd227b3"
            } as Shelter);
            const dataCountAfter = await services.shelters.getShelters({});

            expect(dataCountAfter[1] == dataCountBefore[1] - 1).toBe(true);
        });


        it('It should return error on not sending required value', async () => {
            try {
                await services.shelters.deleteShelter({
                    key: null
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that shelter doesnt exists', async () => {
            try {
                await services.shelters.deleteShelter({
                    key: "12345"
                } as Shelter);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exists"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.shelters.deleteShelter({
                    key: 1234
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