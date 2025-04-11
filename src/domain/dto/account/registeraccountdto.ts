export class RegisterAccountDto {
    constructor(
        public readonly balance_account: number,
    ){}

    static execute(data: any): [string | null, RegisterAccountDto | null] {
        const { balance_account, type_account } = data;
        if (typeof balance_account !== 'number' || typeof type_account !== 'string') {
            return ['Invalid data', null];
        }

        if( balance_account < 0) {
            return ['El saldo inicial no puede ser menor a 0', null];
        }
        if( type_account !== 'checking' && type_account !== 'savings') {
            return ['El tipo de cuenta no es valido', null];
        }
        if(!type_account) {
            return ['El tipo de cuenta es requerido', null];
        }
        return [null, new RegisterAccountDto(balance_account)];
    }
}
