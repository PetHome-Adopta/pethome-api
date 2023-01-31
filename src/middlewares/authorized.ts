
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { roles } from "../models/shelters";

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

        //TODO: 1- Mejorar esto si se puece unificar - roles.admin
        const url = req.baseUrl;
        if(url.includes(roles.admin) && decoded.role !== roles.admin){
            res.sendStatus(403);
            return;
        }

        if(url.includes(roles.shelter) && decoded.role !== roles.shelter){
            res.sendStatus(403);
            return;
        }

        if(url.includes(roles.user) && decoded.role !== roles.user){
            res.sendStatus(403);
            return;
        }

        //TODO: porque pones esto si luego no lo usas en ningun punto de la API ->
            //Si declaro req.body.userKey en algun otro lugar podre obtener el valor?, es como un bean generico que almacena cosas?
        req.body.userKey = decoded.sub;
        req.body.role = decoded.role;
        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(403);
        return;
    }

}