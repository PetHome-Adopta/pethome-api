import { CreateUserHelper, DeleteUserHelper, GetUsersHelper, User, UpdateUserHelper } from '../models/users';
import { Databases } from "../infrastructure/databases/databases";
import { v1 } from "uuid";
import { DeserializerForMongoOptions } from '../utils/DeserializerForMongoHelper';


export class UsersHelper {

    private databases: Databases;
    private collectionName: string = "users";

    constructor(databases: Databases) {
        this.databases = databases;
    }

    async getUsers(options: GetUsersHelper): Promise<[User[], number]> {
        options.filters = await DeserializerForMongoOptions(options.filters);

        try {
            const data = await this.databases.getClients().mongo.collection(this.collectionName).find(options.filters, options.options).toArray();
            const rCount = await this.databases.getClients().mongo.collection(this.collectionName).countDocuments(options.filters);

            return [data as any, rCount];
        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async createUser(options: CreateUserHelper) {
        const toAdd = {
            key: v1(),
            ...options,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        try {
            await this.databases.getClients().mongo.collection(this.collectionName).insertOne(toAdd);
            return toAdd;
        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async updateUser(options: UpdateUserHelper) {
        options.filters = await DeserializerForMongoOptions(options.filters);
        try {
            await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options.filters, {
                $set: {
                    ...options.data,
                    updatedAt: new Date(),
                }
            });

            return options;
        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }

    async deleteUser(options: DeleteUserHelper) {
        try {
            await this.databases.getClients().mongo.collection(this.collectionName).updateOne(options, {
                $set: {
                    deletedAt: new Date(),
                }
            });

            return options;
        } catch (e) {
            throw {
                ok: false,
                message: (e.message || "Database error"),
            };
        }
    }
}