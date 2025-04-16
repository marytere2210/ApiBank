import { Transaction, TransactionsType } from "../../../data/postgres/models/transaction-models";
import { RegisterTransactionDto } from "../../../domain/dto/transaction/registerTransaction.Dto";
import { Account } from "../../../data/postgres/models/account-models";
import { CustomError } from "../../../domain/errors/custom.error";
import { randomUUID } from "crypto";


export class RegisterTransactionService {

    
    async execute(registerTransactionDto: RegisterTransactionDto): Promise<Transaction> {
        console.log("Datos que se van a insertar:", registerTransactionDto);
        try {
        const { amount_transaction: amount, type_transaction, account_id } = registerTransactionDto;


        if (!amount || amount <= 0) {
            throw CustomError.badRequest("El monto debe ser mayor a 0");
        }

        const account = await Account.findOneBy({ id_account: account_id });
        if (!account) {
            throw CustomError.notFound("Cuenta no encontrada");
        }
        console.log("Balance antes:", account.balance_account);
        if (type_transaction === "income") {
            account.balance_account = parseFloat(account.balance_account.toString()) + amount;
        } else if (type_transaction === "outcome") {
            if (account.balance_account < amount) {
                throw CustomError.badRequest("Saldo insuficiente para realizar la transacción");
            }
            account.balance_account = parseFloat(account.balance_account.toString()) - amount;;
        }
        console.log("Balance después:", account.balance_account);
        await account.save();

        const transaction = new Transaction();
        transaction.amount_transaction = amount;
        transaction.type_transaction = type_transaction === 'income' ? TransactionsType.INCOME : TransactionsType.OUTCOME;
        transaction.account = account;
        account.balance_account = account.balance_account;
        
        if(type_transaction === 'income'){
            transaction.ref_resp_transaction = randomUUID();
        }
        else{
            transaction.ref_send_transaction = randomUUID();
        }

        


        await transaction.save();
        return transaction; 
    }
    catch(error){
        console.error("🔥 Error real en el servicio:", error);
        throw error;
    }      
    }
}