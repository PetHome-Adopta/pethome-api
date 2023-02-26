
import App, { services } from "../app";

let server;

beforeAll(async () => {
    server = await App
  });

describe('users', () => {
    //TODO: user is not logged
    //TODO: user is logged
    describe('Create users', () => {
        it('It should return an error at create because there are no params', async () => {
            try {

                await services.users.createUser({} as any);
            
            }catch(e) {
                expect(e).toEqual({
                    ok: false,
                    status: 400,
                    message: "There are required values that don't have a valid value"
                });
            }
            
        });
        it('It should return the created object', async () => {
            try {

                await services.users.createUser({
                    phoneNumber: "test",
                    email: "test",
                    password: "test",
                    address: "test",
                    description: "test",
                    imageURL: "test",
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
    describe('Create users', () => {
        it('It should return data as array', async () => {
            const user = await services.users.getUsers({});
            expect(user).toBeInstanceOf(Array)
            
        });

        it('It should return that the returned data is larger than 0', async () => {
            const user = await services.users.getUsers({});
            expect(user?.[0]?.length > 0).toBe(true)
            
        });
    });
});