import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../../config";
import { RoleUser, TypeUsers } from "../../../data";



export class AuthMiddlewers{

    static async  protect(req: Request, res: Response, next: NextFunction){
        // obtener el token
        const token = req.cookies.token;
        console.log("TOKEN RECIBIDO:", token);

        if (!token) return res.status(401).json({ message: 'No token provided ' });

        try {
            const payload = (await JwtAdapter.verifyToken(token)) as { id: string };
           // if (!payload) return res.status(401)
                const user = await TypeUsers.findOne({
                    where: {
                        id: payload.id,
                        status: true,
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

    static restricTo = (...roles: RoleUser[])=>{
        return (req:Request, res:Response, next:NextFunction)=>{

         if(!roles.includes(req.body.sessionUser.rol)){
            return res.status(403).json({message: 'Your user not authorizated to acces this route'})
            }else{
            next();
         }
        };
    };
};