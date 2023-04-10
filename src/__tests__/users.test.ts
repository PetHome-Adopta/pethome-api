import App, { services } from "../app";
import { User } from "../models/users";
let server;

beforeAll(async () => {
    server = await App;
});

afterAll (async () => {
    if (server) {
        server.close();
    }
});

describe('users', () => {
    describe('Get users', () => {
        it('It should return data as array', async () => {
            const data = await services.users.getUsers({});
            expect(data).toBeInstanceOf(Array);
        });

        it('It should return that the returned data is larger than 0', async () => {
            const data = await services.users.getUsers({});
            expect(data?.[0]?.length > 0).toBe(true);
        });

        it('It should return that the returned data is equal to count', async () => {
            const data = await services.users.getUsers({});
            expect(data?.[0]?.length == data?.[1]).toBe(true);
        });

        it('It should return that the returned data is 0 when user does not exists', async () => {
            const data = await services.users.getUsers({key: "eavjwevbwebn"});
            expect(data?.[0]?.length == 0).toBe(true);
        });

        it('It should return objects without "_id"', async () => {
            const data = await services.users.getUsers({});
            expect(data?.[0]?.[0]?._id == null).toBe(true);
        });
    });

    describe('Create user', () => {
        it('It should return the created object', async () => {
            const data = await services.users.createUser({
                name: "xavitest2",
                password: "abcde12345",
                phoneNumber: "1234",
                email: "test@testPostman2.com",
                description: "string",
                imageURL: "string",
                role: "USER"
            } as User);

            expect(data.name == "Test name").toBe(true);
        });

        it('It should return the created object without "_id"', async () => {
            const data = await services.users.createUser({
                name: "xavitest2",
                password: "abcde12345",
                phoneNumber: "1234",
                email: "test@testPostman3.com",
                description: "string",
                imageURL: "string",
                role: "USER"
            } as User);

            expect(data?._id == null).toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add +1 to the total count', async () => {
            const dataCountBefore = await services.users.getUsers({});
            await services.users.createUser({
                name: "xavitest2",
                password: "abcde12345",
                phoneNumber: "1234",
                email: "test@testPostman4.com",
                description: "string",
                imageURL: "string",
                role: "USER"
            } as User);
            const dataCountAfter = await services.users.getUsers({});

            expect(dataCountAfter[1] == dataCountBefore[1] + 1).toBe(true);
        });

        //TODO: Este test tampoco pasa con ninguno de los expects -> Pet es una interfaz
        //https://stackoverflow.com/questions/46703364/why-does-instanceof-in-typescript-give-me-the-error-foo-only-refers-to-a-ty
        it('It should return an instance of user', async () => {
            const data: User = await services.users.createUser({
                name: "xavitest2",
                password: "abcde12345",
                phoneNumber: "1234",
                email: "test@testPostman5.com",
                description: "string",
                imageURL: "string",
                role: "USER"
            } as User);
        
            expect(data as User).toBe(true);
            //expect(data).toBeInstanceOf(Pet);
        });

        it('It should return error on not sending required value', async () => {
            try {
                await services.users.createUser({
                    password: "abcde12345",
                    phoneNumber: "1234",
                    description: "string",
                    imageURL: "string",
                    role: "USER"
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that user is alredy created', async () => {
            try {
                await services.users.createUser({
                    name: "xavitest",
                    password: "abcde12345",
                    phoneNumber: "1234",
                    email: "test@test.com",
                    description: "string",
                    imageURL: "string",
                    role: "USER"
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "User alredy created"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.users.createUser({
                    name: 12345,
                    password: "abcde12345",
                    phoneNumber: "1234",
                    email: "test@testPostman5.com",
                    description: "string",
                    imageURL: "string",
                    role: "USER"
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

    describe('Update user', () => {
        it('It should return the updated object', async () => {
            const data = await services.users.updateUser({
                key: "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9",
                name: "xavitest2",
                password: "$2a$10$udbz75nkPxqlsbYxvJfmcurZXYg3gmysa3K/Fv81nFlJO0sQXer3O",
                phoneNumber: "1234",
                email: "test@testPostman.com",
                description: "descUpdated",
                imageURL: "string",
                role: "USER"
            } as User);

            expect(data.data.name == "xavitest2").toBe(true);
            expect(data.filters.key == "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9").toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should be the same total count', async () => {
            const dataCountBefore = await services.users.getUsers({});
            await services.users.updateUser({
                key: "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9",
                name: "xavitest2",
            } as User);
            const dataCountAfter = await services.users.getUsers({});

            expect(dataCountAfter[1] == dataCountBefore[1]).toBe(true);
        });


        it('It should return error on not sending required value', async () => {
            try {
                await services.users.updateUser({
                    key: null
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that user doesnt exists', async () => {
            try {
                await services.users.updateUser({
                    key: "12345"
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "User doesn't exists"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.users.updateUser({
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

    describe('Delete user', () => {
        it('It should return the deleted object', async () => {
            const data = await services.users.deleteUser({
                key: "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9",
            } as User);

            expect(data.key == "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9").toBe(true);
        });
        
        //TODO: Problema aqui, jest realmente no crea la entidad por tanto no le suma +1, 
        //este test nunca se cumplira
        it('It should add -1 to the total count', async () => {
            const dataCountBefore = await services.users.getUsers({});
            await services.users.deleteUser({
                key: "a8d6df90-d7da-11ed-bd9c-5f8295fd98a9"
            } as User);
            const dataCountAfter = await services.users.getUsers({});

            expect(dataCountAfter[1] == dataCountBefore[1] - 1).toBe(true);
        });


        it('It should return error on not sending required value', async () => {
            try {
                await services.users.deleteUser({
                    key: null
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
        });

        it('It should return error that user doesnt exists', async () => {
            try {
                await services.users.deleteUser({
                    key: "12345"
                } as User);
            }
            catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "User doesn't exists"
                });
            }
        });

        it('It should return error on sending invalid data type', async () => {
            try {
                await services.users.deleteUser({
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