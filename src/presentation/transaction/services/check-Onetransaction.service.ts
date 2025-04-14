import { CustomError } from "../../../domain/errors/custom.error";
import { Transaction } from "../../../data/postgres/models/transaction-models";



export class CheckTransactionService {
    async execute( id_transaction: string) {
        try {
            
            const transaction = await Transaction.findOne({
                where: { id_transaction},
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