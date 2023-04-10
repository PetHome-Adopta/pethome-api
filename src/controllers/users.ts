import { Express, Request, Response, Router } from "express";
import { services } from "../app";
import { RequestCreateUser, RequestDeleteUser, RequestGetUsers, RequestUpdateUser } from "../models/users";
import { PATHS } from "../utils/Constants";
//TODO: refactor shelter controller into user controller if necessary
export class UsersController {
    #router: Router;

    constructor (app : Express){
        this.#router = Router();
        this.#router.get(PATHS.V1 + PATHS.USERS, this.handleGetUsers.bind(this));
        this.#router.post(PATHS.V1 + PATHS.USERS, this.handleCreateUser.bind(this));
        this.#router.put(PATHS.V1 + PATHS.ADMIN + PATHS.USERS, this.handleUpdateUser.bind(this));
        this.#router.delete(PATHS.V1 + PATHS.ADMIN + PATHS.USERS, this.handleDeleteUser.bind(this));
        app.use(this.#router);
    }

    async handleGetUsers(req: Request, res: Response): Promise<any>{
        try{
            const body: RequestGetUsers = req.body;
            const data = await services.users.getUsers(body);
            
            res.json({
                data: data[0],
                count: data[1],
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleCreateUser(req: Request, res: Response): Promise<any>{
        try{
            const body: RequestCreateUser = req.body;
            const data = await services.users.createUser(body);
            
            res.status(201).json({
                data,
                OK: true
            })
        }
        catch (err: any) {
            console.log(err);
            res.sendStatus(err?.status || 500);
        }
    }

    async handleUpdateUser(req: Request, res: Response): Promise<any>{
        try{
            const body: RequestUpdateUser = req.body;
            const data = await services.users.updateUser(body);
            
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

    async handleDeleteUser(req: Request, res: Response): Promise<any>{
        try{
            const body: RequestDeleteUser = req.body;
            const data = await services.users.deleteUser(body);
            
            res.status(204).json({
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