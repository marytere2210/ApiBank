import { User } from "../../../data/postgres/models/user-models";


export class RegisterUserService{

    constructor (){}

    async execute (userData: any){
        const user = new User();

        user.name_user = userData.name_user;
        user.email_user = userData.email_user;
        user.password_user = userData.password_user;
        user.status_user = userData.status_user;

    }
    }

