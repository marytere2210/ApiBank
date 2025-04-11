
import { User, UserRole } from "../../../data/postgres/models/user-models";
import { CustomError } from "../../../domain/errors/custom.error";


export class FinderUserService{
    async execute(userId: string){
      const user = await User.findOne({
        select:['id_user', 'name_user', 'email_user', 'password_user'],
        where: {
          id_user: userId,
          status_user: UserRole.ACTIVE, 
        },
      });

      if(!user){
        throw CustomError.notFound('User not found');
      }
      return user;
      }
    }
  