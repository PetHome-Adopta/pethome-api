
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export async function Authorized(req: Request, res: Response, next: NextFunction) {

    try {

        const token = req.headers.authorization?.replaceAll("Bearer ", "");

        if (!token) {
            res.sendStatus(403);
            return;
        }

        const decoded = jwt.verify(token, "OAUTH");

        if (decoded.sub == null || typeof (decoded.sub) !== "string") {
            res.sendStatus(403);
            return;
        }

        req.body.userID = decoded.sub;
        next();

    } catch (e) {
        console.log(e);
        res.sendStatus(403);
        return;
    }

}