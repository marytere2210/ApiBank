import { Account } from "../../../data/postgres/models/account-models";
import { RegisterAccountDto } from "../../../domain/dto/account/registeraccountdto";
import { CustomError } from "../../../domain/errors/custom.error";


export class RegisterAccountService {
  async execute(registerAccountDto: RegisterAccountDto) {
        const { balance_account, type_account } = registerAccountDto;
    }
    async createAccount(balance_account: number, type_account: string){
        const account = new Account();
        account.balance_account = balance_account;
        account.type_account = type_account;

        if (account.balance_account < 0) {
            throw CustomError.badRequest("El saldo inicial no puede ser menor a 0");
        }
        
        try {
            await account.save();    
            return account;
        } catch (error) {
            throw CustomError.internalServer("Error al crear la cuenta:");
        }
    }
}
/**
 * import { Account } from "../../../data/postgres/models/account-models";
import { RegisterUserDto } from "../../../domain/dto/user/register_User.dto";
import { CustomError } from "../../../domain/errors/custom.error";

export class RegisterAccountService {
    async execute(registerUserDto: RegisterUserDto): Promise<Account> {
        const { balance_account, type_account } = registerUserDto;

        // Validación inicial
        if (balance_account < 0) {
            throw CustomError.badRequest("El saldo inicial no puede ser menor a 0");
        }

        // Crear la cuenta utilizando el método createAccount
        try {
            const account = await this.createAccount(balance_account, type_account);
            return account;
        } catch (error) {
            throw new CustomError.internalServer(`Error durante la ejecución: ${error.message}`);
        }
    }

    async createAccount(balance_account: number, type_account: string): Promise<Account> {
        const account = new Account();
        account.balance_account = balance_account;
        account.type_account = type_account;

        try {
            await account.save();
            return account;
        } catch (error) {
            throw CustomError.internalServer(`Error al crear la cuenta: ${error.message}`);
        }
    }
}
 */