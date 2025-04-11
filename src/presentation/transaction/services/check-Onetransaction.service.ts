import { User } from "../../../data/postgres/models/user-models";
import { CustomError } from "../../../domain/errors/custom.error";
import { Transaction } from "../../../data/postgres/models/transaction-models";
import { In } from "typeorm";


export class CheckTransactionService {
    async execute(id_user: string, id_transaction: string) {
        try {
            const user = await User.findOne({
                where: { id_user },
                relations: { accounts: true },
            });

            if (!user) {
                throw CustomError.notFound("No se encontró el usuario.");
            }

            if (user.accounts.length === 0) {
                throw CustomError.notFound("El usuario no tiene cuentas registradas.");
            }
            const activeAccounts = user.accounts.filter(account => account.status_account === true);

            if (activeAccounts.length === 0) {
                throw CustomError.notFound("El usuario no tiene cuentas activas.");
            }
            const transaction = await Transaction.findOne({
                where: { id_transaction, account: { id_account: In(activeAccounts.map(account => account.id_account)) } },
                relations: { account: { user: true } },
                select: [
                    "createdAt_transaction",
                    "id_transaction",
                    "type_transaction",
                    "amount_transaction",
                    "account",
                ],
            });

            if (!transaction) {
                throw CustomError.notFound("No se encontró la transacción en cuentas activas.");
            }

            return transaction;
        } catch (error) {
            throw CustomError.internalServer(`Error al consultar la transacción`);
        }
    }
}