
import { Request } from "express";
import { User, UserRole } from "../../../data/postgres/models/user-models";
import { CustomError } from "../../../domain/errors/custom.error";

      export class FinderUserService {
        async execute(req: Request) {
           
            const userId = req.user?.id_user;
    
            if (!userId) {
                throw CustomError.unAuthorized("User is not logged in.");
            }
    
            const user = await User.findOne({
                select: ["id_user", "name_user", "email_user"],
                where: {
                    id_user: userId,
                    status_user: UserRole.ACTIVE,
                },
            });
    
            if (!user) {
                throw CustomError.notFound(`User with ID ${userId} not found`);
            }
    
            return user;
        }
    }
  