export class RegisterTransactionDto{

    constructor(
        public readonly amount_transaction: number,
        public readonly type_transaction: "income" | "outcome",
        public readonly account_id: string,
        

    ){}

    static execute(data: any): [string | null, RegisterTransactionDto | null] {
        const { amount, type_transaction, account_id} = data;
        if (typeof amount !== 'number' || typeof type_transaction !== 'string'
            || typeof account_id !== 'string') {
            return ['Invalid data', null];
        }
        if( amount < 0) {
            return ['El monto no puede ser menor a 0', null];
        }   
        if( type_transaction !== 'income' && type_transaction !== 'outcome') {
            return ['El tipo de transaccion no es valido', null];
        }
        if(!account_id) {   
            return ['La cuenta es requerida', null];
        } 
        return [null, new RegisterTransactionDto(amount, type_transaction, account_id)];}

}