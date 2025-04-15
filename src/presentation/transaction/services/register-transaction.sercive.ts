/**import { Transaction } from "../../../data/postgres/models/transaction-models";
import { RegisterTransactionDto } from "../../../domain/dto/transaction/registerTransaction.Dto";
import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";

export class RegisterTransactionService {
    async execute(registerTransactionDto: RegisterTransactionDto): Promise<Transaction> {
       try{   
        const { amount_transaction: amount, type_transaction, account_id} = registerTransactionDto;

        if (!amount || amount <= 0) {
            throw CustomError.badRequest("El monto debe ser mayor a 0");
        }

        if (!["income", "outcome"].includes(type_transaction)) {
            throw CustomError.badRequest("El tipo de transacción no es válido");
        }
        const account = await Account.findOneBy({ account_id : account_id  });
        if (!account) {
            throw CustomError.notFound("Cuenta no encontrada");
        }

        if (type_transaction === "income") {
            account.balance_account += amount;
        } else if (type_transaction === "outcome") {
            if (account.balance_account < amount) {
                throw CustomError.badRequest("Saldo insuficiente para realizar la transacción");
            }
            account.balance_account -= amount;
        }
        await account.save();

        const transaction = new Transaction();
        transaction.amount_transaction = amount;
        transaction.account = account;
        await transaction.save();
        return transaction;     
        
    }
    catch(error){
        console.error("🔥 Error real en el servicio:", error);
        throw error;
    }
    }
}*/

import { Transaction } from "../../../data/postgres/models/transaction-models";
import { RegisterTransactionDto } from "../../../domain/dto/transaction/registerTransaction.Dto";
import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";

export class RegisterTransactionService {
    async execute(registerTransactionDto: RegisterTransactionDto): Promise<Transaction> {
        console.log("Datos que se van a insertar:", registerTransactionDto);
        try {
        const { amount_transaction: amount, type_transaction, account_id } = registerTransactionDto;


        if (!amount || amount <= 0) {
            throw CustomError.badRequest("El monto debe ser mayor a 0");
        }

        if (!["income", "outcome"].includes(type_transaction)) {
            throw CustomError.badRequest("El tipo de transacción no es válido");
        }
        const account = await Account.findOneBy({ id_account: account_id });
        if (!account) {
            throw CustomError.notFound("Cuenta no encontrada");
        }

        if (type_transaction === "income") {
            account.balance_account += amount;
        } else if (type_transaction === "outcome") {
            if (account.balance_account < amount) {
                throw CustomError.badRequest("Saldo insuficiente para realizar la transacción");
            }
            account.balance_account -= amount;
        }
        await account.save();

        const transaction = new Transaction();
        transaction.amount_transaction = amount;
        transaction.account = account;
        await transaction.save();
        return transaction; 
    }
    catch(error){
        console.error("🔥 Error real en el servicio:", error);
        throw error;
    }      
    }
}