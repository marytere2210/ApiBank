// src/services/account.service.ts
import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";

export class DeleteAccountService {

    async deleteAccount(id: string): Promise<void> {
        try {
            const account = await Account.findOneByOrFail({ id_account: id });
            if(!account) {
                throw CustomError.notFound("Cuenta no encontrada");
            }
            if (account.balance_account > 0) {
                throw CustomError.badRequest("No se puede eliminar la cuenta porque tiene un saldo mayor a 0");
            }
            await account.remove();
        } catch (error) {
            
            throw CustomError.internalServer("Error al eliminar la cuenta: " );
         }
    }
}