import { Account } from "../../../data/postgres/models/account-models";
import { User } from "../../../data/postgres/models/user-models";
import { CustomError } from "../../../domain/errors/custom.error";
import { Transaction } from "../../../data/postgres/models/transaction-models";
import { In } from "typeorm";


export class CheckAllTransactionService {

    
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

            const activeAccounts = user.accounts.filter(account => account.status_account === true);

            if (activeAccounts.length === 0) {
                throw CustomError.notFound("El usuario no tiene cuentas activas.");
            }

            const transaction = await Transaction.find({
                where: { 
                    account:In(user.accounts.map((account: Account) => account.id_account)), },
                    relations: { account: { user: true} },
                select: [
                    "createdAt_transaction",
                    "id_transaction",
                    "type_transaction",
                    "amount_transaction",
                    "account",
                ],});
           if(transaction.length === 0) {
                throw CustomError.notFound("No se encontraron transacciones.");
            }

            return transaction;
        } catch (error) {
            throw CustomError.internalServer(`Error al obtener las transacciones`);
        }
    }
}
