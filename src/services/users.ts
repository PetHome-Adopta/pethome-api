import { RequestGetUsers, RequestCreateUser, RequestUpdateUser, RequestDeleteUser, roles } from '../models/users';
import { helpers } from "../app";
import bcrypt from "bcryptjs";

export class UsersServices {
    async getUsers(data: RequestGetUsers) {
        const response = await helpers.users.getUsers({
                filters: {
                    key: data.key,
                    phoneNumber: data.phoneNumber,
                    email: data.email,
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

    async createUser(data: RequestCreateUser) {
        if (
            data.name == null ||
            data.phoneNumber == null ||
            data.email == null ||
            data.password == null)
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        if (typeof (data.phoneNumber) !== "string" ||
            typeof (data.email) !== "string" ||
            typeof (data.password) !== "string"
            ) {
            throw {
                ok: false,
                status: 400,
                message: "Invalid data type"
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
                message: "User alredy created or it's deleted"
            }

        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);

        return await helpers.users.createUser({
            name: data.name,
            password: data.password,
            phoneNumber: data.phoneNumber,
            email: data.email,
            description: data.description,
            imageURL: data.imageURL,
            role: data.role
        });
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
                role: data.role,
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
                message: "User doesn't exist"
            }

        return await helpers.users.deleteUser({
            key: data.key
        });
    
    }
}