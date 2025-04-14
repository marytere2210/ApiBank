import { NextFunction, Request, Response } from "express";
import { GenerateTokenforUser } from "../../../config/generateTokenUser";
import { User, UserRole } from "../../../data/postgres/models/user-models";

declare global {
    namespace Express{
        interface Request{
           user?: User;
        }
    }
}

export class AuthMiddlewers{

    static async  protect(req: Request, res: Response, next: NextFunction){
        
        const token = req.params.token//req.cookies?.token;
        console.log("TOKEN RECIBIDO:", token);

        if (!token) return res.status(401).json({ message: 'No token PROVIDED' });

        try {
            const payload = (await GenerateTokenforUser.verifytoken(token)) as { id: string };

            if(!payload) return res.status(401).json({ message: 'Invalid token.' });
            console.log("PAYLOAD:", payload);
        
                const user = await User.findOne({
                    where: {
                        id_user: payload.id,
                        status_user: UserRole.ACTIVE,
                    },
                });
                if (!user) return res.status(401).json({ message: 'Invalid token.' });
                console.log(user)
              req.user = user;
                next();

        } catch (error) {
            console.error(error);
      return res.status(500).json({ message: 'internal server error...' });
        }
    };
}