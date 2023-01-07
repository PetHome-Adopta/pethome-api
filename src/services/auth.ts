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

            console.log(data.password)

            if((await bcrypt.compare(data.password, userData.password)) === false) {
                throw {
                    ok: false,
                    status: 403
                };
            }

            

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
            throw e;
        }
    }
}