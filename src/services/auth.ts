import { helpers, infrastructure } from "../app";
import { RequestLogin } from '../models/auth';
import bcrypt from "bcryptjs";

export class AuthServices {
    async Login(data: RequestLogin) {
        if (data.email == null || data.password == null) 
            throw {
                ok: false,
                status: 400,
                message: "There are required values that don't have a valid value"
            }

        try {

            const userData = await helpers.auth.Login({
                filters: {
                    email: data.email,
                    deletedAt: null
                },
                options: {
                    limit: 1
                }
            });

            console.log("Logging as: " , userData);

            if((await bcrypt.compare(data.password, userData.password)) === false) {
                throw {
                    ok: false,
                    status: 403
                };
            }
            
            if (userData == null)
                throw {
                    ok: false,
                    status: 403
                };
            
            if (userData?.key != null) {
                const userLogged = await helpers.shelters.getShelters({
                    filters: {
                        key: userData.key,
                        deletedAt: null
                    },
                    options: {
                        sort: { _id: -1 }
                    }
                });

                // Login
                const token = await infrastructure.jwt.codeToken(
                    //TODO: Porque he de hacer el userLogged[0][0]? porque es una promise
                    userData.key, userLogged[0][0].role
                );

                return {token, userLogged};
            } else {
                throw new Error(JSON.stringify({
                    ok: false,
                    message: "key not found"
                }));
            }
        } catch (e) {
            throw e;
        }
    }
}