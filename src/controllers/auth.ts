import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestRegister, RequestLogin } from '../entities/models/auth';
import { PATHS } from "../utils/Constants";

export class AuthController {
    #router: Router;

    constructor(app: Express) {
        this.#router = Router();
        this.#router.post(PATHS.V1 + PATHS.REGISTER, this.handleRegisterUser.bind(this));
        this.#router.post(PATHS.V1 + PATHS.LOGIN, this.handleLoginUser.bind(this));
        app.use(this.#router);
    }

    async handleRegisterUser(req: Request, res: Response) {
        try {
            const body: RequestRegister = req.body;
            const data = await services.auth.Register(body);

            res.status(201).json({
                data,
                OK: true
            })
        }
        catch (err) {
            console.log(err);
            res.sendStatus(err?.status || 500);
            //TODO: send body "if (err.message) res.send(err?.message)" -> en todos
        }
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