import { Router } from "express";
import { UserRoutes } from "./user/routes-user";


export class AppRoutes{
    static get routes():Router{
        const router = Router();

     router.use('/api', UserRoutes.routes);


        return router;
        

    }
}