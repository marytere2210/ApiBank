import { Router } from "express";
import { ControllerAccount } from "./controller-account";
import { RegisterAccountService } from "./services/register_account.services";
import { CheckAllAccountService } from "./services/check_accounts.service";
import { CheckOneAccountService } from "./services/check_one_account.service";
import { DeleteAccountService } from "./services/delete_account.service";
import { FinderUserService } from "../user/services/finder-user-service";
import { AuthMiddlewers } from "../common/middlewers/auth.middlewers";

export class AccountRoutes{
    static get routes():Router{
        const router = Router();
        const finderUserService = new FinderUserService();
        const registerAccountService = new RegisterAccountService(finderUserService);
        const checkAllAccountService = new CheckAllAccountService();
        const checkOneAccountService = new CheckOneAccountService();
        const deleteAccountService = new DeleteAccountService();

        const controller = new ControllerAccount(
            registerAccountService,
            checkAllAccountService,
            checkOneAccountService,
            deleteAccountService
        );
  
        router.post("/register/:userId", AuthMiddlewers.protect, controller.register_account.bind(controller));
        router.get("/check_all_accounts/:userId",AuthMiddlewers.protect,  controller.check_all_accounts.bind(controller));
        router.get("/check_one_account/:account_number", AuthMiddlewers.protect, controller.check_one_account.bind(controller));
        router.delete("/delete_account/:account_number", AuthMiddlewers.protect, controller.delete_account.bind(controller));

        return router;

    }
}