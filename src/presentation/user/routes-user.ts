import { Router } from "express";
import { ControllerUser } from "./controller-user";
import { RegisterUserService } from "./services/register-user-service";
import { EmailService } from "../common/services/email.services";
import { envs } from "../../config";
import { UserRole } from "../../data/postgres/models/user-models";


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

        const controller = new ControllerUser(
            registerUserService
        );

        router.post("/auth/register", controller.register.bind(controller));

        router.get("/validate/:token", controller.validate);
        return router;
    }

    }
