import { Account} from "../../../data/postgres/models/account-models";
import { User } from "../../../data/postgres/models/user-models";
import { CustomError } from "../../../domain/errors/custom.error";


export class CheckAllAccountService {

    
    async execute(id_user: string) {
        try {
            const user = await User.findOne({
                where: { id_user },
                relations: { accounts: true },
            });
            if (!user) {
                throw CustomError.notFound("No se encontró el usuario.");
            }
            if (user.accounts.length === 0) {
                throw CustomError.notFound("No se encontraron cuentas.");
            }
            
            const accounts = await Account.find({
                where: { 
                    user: true, 
                    status_account: true 
                },
                select: [
                    "account_number",
                    "balance_account",
                    "type_account",
                    "status_account",
                    "user",
                ],
                relations: { user: true },
            });
            if (accounts.length === 0) {
                throw CustomError.notFound("No se encontraron cuentas.");
            }

            return accounts;
        } catch (error) {
            throw CustomError.internalServer(`Error al obtener las cuentas`);
        }
    }
}
