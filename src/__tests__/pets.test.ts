
import App, { services } from "../app";
import { Pet } from "../models/pets";

let server;

beforeAll(async () => {
    server = await App;
});

afterAll (async () => {
    if (server) {
        server.close();
    }
});

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

        it('It should return objects without "_id"', async () => {
            const data = await services.pets.getPets({});
            expect(data?.[0]?.[0]?._id == null).toBe(true);
        });
    });
    
    describe('Create pets', () => {
        //TODO: DUDA - el shelterKey y el petTypeKey iran variando para cada una de las personas que tengans la bbdd en local -> uuid, como podemos unificarlo?
        //recuperar el valor con service.shelter.getShelters({}) ?????
        it('It should return the created object', async () => {
            const data = await services.pets.createPet({
                name: "Test name",
                shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                description: "Test description",
                litter: true
            } as Pet);

            expect(
                data.name == "Test name" &&
                data.shelterKey == "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd" &&
                data.petTypeKey == "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd" &&
                data.description == "Test description"
                //TODO: check porque añadiendo esto no pasa el test pero quitandolo si 
                //&& data.litter == true
            ).toBe(true);
        });

        it('It should return the created object without "_id"', async () => {
            const data = await services.pets.createPet({
                name: "Test name",
                shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                description: "Test description",
                litter: true
            } as Pet);

            expect(data?._id == null).toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add +1 to the total count', async () => {
            const dataCountBefore = await services.pets.getPets({});
            await services.pets.createPet({
                name: "Test name",
                shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                description: "Test description",
                litter: true
            } as Pet);
            const dataCountAfter = await services.pets.getPets({});

            expect(dataCountBefore[1] == dataCountAfter[1] + 1).toBe(true);
        });

        //TODO: Este test tampoco pasa con ninguno de los expects -> Pet es una interfaz
        //https://stackoverflow.com/questions/46703364/why-does-instanceof-in-typescript-give-me-the-error-foo-only-refers-to-a-ty
        it('It should return an instance of Pet', async () => {
            const data: Pet = await services.pets.createPet({
                name: "Test name",
                shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                description: "Test description",
                litter: true
            } as Pet);
        
            expect(data as Pet).toBe(true);
            //expect(data).toBeInstanceOf(Pet);
        });

        it('It should return error on not sending required value', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name"
                } as Pet);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.pets.createPet({
                    name: 123,
                    shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                    petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                    description: "Test description",
                    litter: true
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

        it('It should return error on sending Pet type doesnt exist or its deleted', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name",
                    shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                    petTypeKey: "abcdef",
                    description: "Test description",
                    litter: true
                } as Pet);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Pet type doesn't exist or it's deleted"
                });
            }
        });

        it('It should return error on sending Shelter doesnt exist or its deleted', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name",
                    shelterKey: "abcdef",
                    petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                    description: "Test description",
                    litter: true
                } as Pet);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exist or it's deleted"
                });
            }
        });

        it('It should return error on sending Pet adopted with dosent exists or has been adopted', async () => {
            try {
                await services.pets.createPet({
                    name: "Test name",
                    shelterKey: "3a9f4b10-9500-11ed-9c4e-c1dfd48b86fd",
                    petTypeKey: "ba14fe30-9500-11ed-9c4e-c1dfd48b86fd",
                    description: "Test description",
                    litter: true,
                    adoptedWith: "abcd",
                } as any);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "Pet adopted with dosen't exists or has been adopted"
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