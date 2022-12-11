import { NextFunction, Request, Response } from "express";

export async function Deserializer(req: Request, res: Response, next: NextFunction) {

    // Check the typo and deserialize the request using it
    const header = req.headers['content-type'];

    if (header == null) {
        const body = { ...req.query, ...req.params };
        req.body = body;
        next();
        return;
    }

    if (header?.indexOf("application/json") > -1 || header?.indexOf("application/x-www-form-urlencoded") > -1) {
        // Deserialize JSON Body and next it
        const body = await getStream(req);
        req.body = body;
        next();
        return;
    }

    if (header?.indexOf("multipart/form-data") > -1) {
        // Deserialize the multipart following the next rule:
        // If a file is uploaded with the name "data" it will be deserialized as a JSON. All the other files will be uploaded temporary to an S3 instance

        // TODO: Upload files and S3 connections. Meanwhile i will trat it as the others.
        const body = await getStream(req);
        req.body = body;
        next();
        return;
    }

    res.status(400).send("Invalid content-type");
    return;

}

async function getStream(req: Request) {

    return new Promise((resolve, reject) => {

        try {

            let data = [];

            req.on("data", (chunk) => {
                data.push(chunk);
            });
            req.on("end", () => {
                const parsedBody = Buffer.concat(data).toString();
                resolve(parsedBody);
            });
        } catch (e) {
            reject("error deserializing");
        }
    });
}