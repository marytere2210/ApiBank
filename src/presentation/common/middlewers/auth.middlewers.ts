import { NextFunction, Request, Response } from "express";
import { GenerateTokenforUser } from "../../../config/generateTokenUser";
import { User, UserRole } from "../../../data/postgres/models/user-models";



export class AuthMiddlewers{

    static async  protect(req: Request, res: Response, next: NextFunction){
        
        const token = req.cookies.token;
        console.log("TOKEN RECIBIDO:", token);

        if (!token) return res.status(401).json({ message: 'No token provided ' });

        try {
            const payload = (await GenerateTokenforUser.verifytoken(token)) as { id: string };
        
                const user = await User.findOne({
                    where: {
                        id_user: payload.id,
                        status_user: UserRole.ACTIVE,
                    },
                });
                if (!user) return res.status(401).json({ message: 'Invalid token.' });
                console.log(user)
              req.body.sessionUser = user;
                next();

        } catch (error) {
            console.error(error);
      return res.status(500).json({ message: 'internal server error...' });
        }
    };

    static restricTo = (...roles: UserRole[])=>{
        return (req:Request, res:Response, next:NextFunction)=>{

         if(!roles.includes(req.body.sessionUser.rol)){
            return res.status(403).json({message: 'Your user not authorizated to acces this route'})
            }else{
            next();
         }
        };
    };
};