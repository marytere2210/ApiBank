import { Router } from "express";
import { UserRoutes } from "./user/routes-user";
import { RoutesTransaction } from "./transaction/routes-service";
import { AccountRoutes } from "./account/routes-account";
import { AuthMiddlewers } from "./common/middlewers/auth.middlewers";


export class AppRoutes{
    static get routes():Router{
        const router = Router();

   
     router.use('/api', UserRoutes.routes);
     router.use('/api/transactions', RoutesTransaction.routes);
     router.use('/api/accounts', AccountRoutes.routes);
     


        return router;
        

    }
}