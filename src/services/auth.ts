import { helpers, infrastructure } from "../app";
import { RequestLogin, RequestRegister } from '../entities/models/auth';
import bcrypt from "bcryptjs";

export class AuthServices {
    async Login(data: RequestLogin) {
        if (data.email == null || data.password) 
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        try {
            if((await bcrypt.compare(data.password, data.password)) === false) {
                throw {
                    ok: false,
                    status: 403
                };
            }

            const userData = await helpers.auth.Login({
                filters: {
                    email: data.email,
                    deletedAt: null
                },
                options: {
                    limit: 1
                }
            });

            //TODO: "if (!userData) or if (userData == null)" -> como esta mejor?
            if (userData === null)
                throw {
                    ok: false,
                    status: 403
                };
            
            if (userData?.key != null) {
                // Login
                return await infrastructure.jwt.codeToken({
                    key: userData.key
                });

            } else {
                throw new Error(JSON.stringify({
                    ok: false,
                    message: "key not found"
                }));
            }
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async Register(data: RequestRegister) {
        try {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            //TODO: is this necessary? those are mandatory params on interface, is any way to auto check on interfaces and send a generic error?
            if (data.email == null || data.password == null || data.phoneNumber == null || data.address == null || data.role == null)
                throw {
                    status: 403,
                    ok: false,
                    message: "There are some required parameters that aren't complete"
                };
            

            const shelter = await helpers.shelters.getShelters({
                filters: {
                    phoneNumber: data.phoneNumber,
                    email: data.email,
                },
                options: {
                    sort: {_id: -1}
                }
            });

            if (shelter){
                throw {
                    status: 403,
                    ok: false,
                    message: "User alredy created"
                }; 
            }

            const register = await helpers.auth.Register({
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                address: data.address,
                description: data.description,
                role: "USER"
            });

            return await infrastructure.jwt.codeToken({
                key: register.key
            });

        } catch (e) {
            console.log(e);
            throw e;
        }

    }
}