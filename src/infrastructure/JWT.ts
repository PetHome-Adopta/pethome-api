
import JWT from "jsonwebtoken";
import fs from "fs";
import { CodeToken } from "../entities/JWT";

export class JWTInfrastructure {


    async decodeToken(token: string) {
        try {

            const data = await JWT.verify(token, process.env.ENV === "PROD" ? fs.readFileSync(process.env.OAUTH) : "OAUTH", {
                algorithms: ["HS256"]
            });

            return data;
        } catch (e) {
            console.log(e);
            throw new Error;
        }
    }

    async codeToken(sub: CodeToken, role: string) {

        try {

            const token = await JWT.sign({sub, role}, process.env.ENV === "PROD" ? fs.readFileSync(process.env.OAUTH) : "OAUTH", {
                algorithm: "HS256"
            })

            return token;

        } catch (e) {
            console.log(e);
            throw new Error;
        }

    }
}