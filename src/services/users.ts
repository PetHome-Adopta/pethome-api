import { RequestGetUsers, RequestCreateUser, RequestUpdateUser, RequestDeleteUser, roles, User } from '../models/users';
import { helpers } from "../app";
import bcrypt from "bcryptjs";

export class UsersServices {
    async getUsers(data: RequestGetUsers): Promise<[User[], number]> {
        const response: [User[], number] = await helpers.users.getUsers({
                filters: {
                    key: data.key,
                    name: data.name,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                    password: data.password,
                    description: data.description,
                    imageURL: data.imageURL,
                    preferedCoin: data.preferedCoin,
                    role: data.role,
                    shelterKey: data.shelterKey,
                    deletedAt: null
                },
                options: {
                    sort: { _id: -1 }
                }
            });
        //TODO: refactor into utils static method?
        for(let element of response[0])
            delete element._id;
            
        return response;
    }

    async createUser(data: RequestCreateUser): Promise<User> {
        if (
            data.name == null ||
            data.phoneNumber == null ||
            data.email == null ||
            data.password == null ||
            data.description == null ||
            data.role == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (
            typeof (data.name) !== "string" ||
            typeof (data.phoneNumber) !== "string" ||
            typeof (data.email) !== "string" ||
            typeof (data.password) !== "string" ||
            typeof (data.description) !== "string" ||
            typeof (data.role) !== "string"
            ) {
            throw {
                ok: false,
                status: 400,
                message: "Invalid data type"
            }
        }

        if(data.shelterKey){
            const shelter = await helpers.shelters.getShelters({
                filters: {
                    key: data.shelterKey,
                    deletedAt: null
                },
                options: {
                    sort: { _id: -1 }
                }
            });
            if (shelter[1] === 0)
                throw {
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exists"
                }
        }

        const user = await helpers.users.getUsers({
            filters: {
                phoneNumber: data.phoneNumber,
                email: data.email,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (user[1] > 0)
            throw {
                ok: false,
                status: 400,
                message: "User alredy created"
            }

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        const response: User = await helpers.users.createUser({
            name: data.name,
            phoneNumber: data.phoneNumber,
            email: data.email,
            password: data.password,
            description: data.description,
            imageURL: data.imageURL,
            preferedCoin: data.preferedCoin,
            role: data.role,
            shelterKey: data.shelterKey,
            //TODO: refactor -> role: data.role || roles.user
        });

        delete response._id;

        return response;
    }

    async updateUser(data: RequestUpdateUser) {
        if (data.key == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            };

        const user = await helpers.users.getUsers({
            filters: {
                key: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (user[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "User doesn't exist or it's deleted"
            }

        if(data.shelterKey){
            const shelter = await helpers.shelters.getShelters({
                filters: {
                    key: data.shelterKey,
                    deletedAt: null
                },
                options: {
                    sort: { _id: -1 }
                }
            });
            if (shelter[1] === 0)
                throw {
                    ok: false,
                    status: 400,
                    message: "Shelter doesn't exists"
                }
        }

        return await helpers.users.updateUser({
            filters: {
                key: data.key,
            },
            data: {
                name: data.name,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                description: data.description,
                imageURL: data.imageURL,
                preferedCoin: data.preferedCoin,
                role: data.role,
                shelterKey:data.shelterKey,
            }
        });
    }

    async deleteUser(data: RequestDeleteUser) {
        if (data.key == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.key) !== 'string')
            throw {
                ok: false,
                status: 400,
                message: "Invalid key type"
            }

        const user = await helpers.users.getUsers({
            filters: {
                key: data.key,
                deletedAt: null
            },
            options: {
                sort: { _id: -1 }
            }
        });
        if (user[1] === 0)
            throw {
                ok: false,
                status: 400,
                message: "User doesn't exist or it's deleted"
            }

        if(user[0][0].shelterKey){
            await helpers.shelters.deleteShelter({
                key: user[0][0].shelterKey
            });
        }
        
        return await helpers.users.deleteUser({
            key: data.key
        });
    
    }
}