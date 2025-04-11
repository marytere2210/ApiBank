export class RegisterAccountDto {
    balance_account: number;
    type_account: string;

    constructor(balance_account: number, type_account: string) {
        if (balance_account < 0) {
            throw new Error("El saldo inicial no puede ser menor a 0");
        }

        this.balance_account = balance_account;
        this.type_account = type_account;
    }
}