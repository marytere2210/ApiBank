import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";

export class CheckAllAccountService {
    async getAllAccounts(): Promise<Account[]> {
        try {
            const accounts = await Account.find({
                select: [
                    "account_number",
                    "balance_account",
                    "type_account",
                    "status_account",
                ],
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