
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { roles } from "../models/users";

export async function Authorized(req: Request, res: Response, next: NextFunction) {

    try {

        const token = req.headers.authorization?.replaceAll("Bearer ", "");

        if (!token) {
            res.sendStatus(403);
            return;
        }

        
        const decoded: any = jwt.verify(token, "OAUTH");

        if (decoded.sub == null || typeof (decoded.sub) !== "string" ||
        decoded.role == null || typeof (decoded.role) !== "string") {
            res.sendStatus(403);
            return;
        }

        //TODO: 1- Mejorar esto si se puece unificar - roles.admin --> Unificado para hacerlo generico
        const url = req.baseUrl;
        for(let row of Object.values(roles)) {
            if(url.includes(row) && decoded.role !== row) {
                res.sendStatus(403);
                return;
            }
        }

        //TODO: porque pones esto si luego no lo usas en ningun punto de la API ->
            //Si declaro req.body.userKey en algun otro lugar podre obtener el valor?, es como un bean generico que almacena cosas?
            // Esto esta añadido para saber el rol del usuario y el userKey en los siguientes pasos.
        req.body.userKey = decoded.sub;
        req.body.role = decoded.role;
        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(403);
        return;
    }

}