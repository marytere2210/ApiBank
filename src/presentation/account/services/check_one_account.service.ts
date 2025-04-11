import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";

export class CheckOneAccountService {
    async execute(account_number: string) {
        if (!account_number) {
            throw CustomError.badRequest("El número de cuenta es requerido");
        }
        
        try {
            const checkaccount = await Account.findOneBy({ account_number });
            if (!checkaccount) {
                throw CustomError.notFound("Cuenta no encontrada");
            }
            return checkaccount;
        } catch (error) {
            throw CustomError.internalServer("Error al verificar la cuenta: ");
        }
    }   

}