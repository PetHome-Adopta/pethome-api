import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestLogin } from '../entities/models/auth';
import { PATHS } from "../utils/Constants";

export class AuthController {
    #router: Router;

    constructor(app: Express) {
        this.#router = Router();
        this.#router.post(PATHS.V1 + PATHS.LOGIN, this.handleLoginUser.bind(this));
        app.use(this.#router);
    }

    async handleLoginUser(req: Request, res: Response) {
        try {
            const body: RequestLogin = req.body;
            const data = await services.auth.Login(body);

            res.status(200).json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }
}