import { Router } from "express";
import { ControllerUser } from "./controller-user";
import { RegisterUserService } from "./services/register-user-service";
import { EmailService } from "../common/services/email.services";
import { envs } from "../../config";
import { LoginUserService } from "./services/login-user-service";



export class UserRoutes{
    static get routes():Router{
        const router = Router();
        const emailService = new EmailService(
            envs.MAILER_SERVICE,
            envs.MAILER_EMAIL,
            envs.MAILER_SECRET_KEY,
            envs.SENDMAIL
        );
        const registerUserService = new RegisterUserService(emailService);
        const loginUserService = new LoginUserService();

        const controller = new ControllerUser(
            registerUserService,
            loginUserService
        );

        router.post("/auth/register",controller.register.bind(controller));

        router.get("/validate/:token", controller.validate.bind(controller));
        
        router.post("/auth/login",controller.login.bind(controller));

        router.get("/users/me",controller.findermeuser.bind(controller))

        return router;
    }

    }
