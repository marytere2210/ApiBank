export class RegisterTransactionDto{

    constructor(
        public readonly amount_transaction: number,
        public readonly type_transaction: string,
        public readonly account_id : string,
    ){}

    static execute(data: any): [string | null, RegisterTransactionDto | null] {
        const { amount_transaction, type_transaction, account_id } = data;

        console.log('data', data);
        if (typeof amount_transaction !== 'number' || typeof type_transaction !== 'string'
            || typeof account_id  !== 'string') {
            return ['Invalid data', null];
        }
        if( amount_transaction < 0) {
            return ['El monto no puede ser menor a 0', null];
        }   
        if( type_transaction !== 'income' && type_transaction !== 'outcome') {
            return ['El tipo de transaccion no es valido', null];
        }
        if(!account_id ) {   
            return ['La cuenta es requerida', null];
        } 
        return [null, new RegisterTransactionDto(amount_transaction, type_transaction, account_id )];}
}