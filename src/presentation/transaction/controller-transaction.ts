import { CheckAllTransactionService } from "./services/check-Alltransaction.service";
import { RegisterTransactionService } from "./services/register-transaction.sercive";
import { CheckTransactionService } from "./services/check-Onetransaction.service";
import { CustomError } from "../../domain/errors/custom.error";
import { Response, Request } from "express";
import { RegisterTransactionDto } from "../../domain/dto/transaction/registerTransaction.Dto";

export class ControllerTransaction {

    constructor(
        private readonly registerTransactionService: RegisterTransactionService,
        private readonly checkTransactionService: CheckTransactionService,
        private readonly checkAllTransactionService: CheckAllTransactionService,
    ){}

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof CustomError){
            return res.status(error.statusCode).json({message: error.message});
        }

        return res.status(500).json({message: 'Internal Server Error'});
    };

    /**register_transaction = (req: Request, res: Response) => {
        //const { account_number } = req.body;
        const { type_transaction, amount, account_number } = req.body;

       const [error, registerTransactionDto] = RegisterTransactionDto.execute({
        type_transaction,
        amount,
        account_number,
       })

       if(error){
        console.log('validacion de error:', error)
        return res.status(422).json({message: error})
       }

        this.registerTransactionService
            .execute(registerTransactionDto!)
            .then((response) => res.status(201).json(response))
            .catch((error) => this.handleError(error, res));
            console.log('servicio error:', error);
            
    };*/

    
    register_transaction = (req: Request, res: Response) => {
        console.log("req.body:", req.body);
        const { account_id } = req.body;
        console.log("id_account:", account_id);
        const { type_transaction, amount_transaction } = req.body;
        console.log("type_transaction:", type_transaction);
       const [error, registerTransactionDto] = RegisterTransactionDto.execute({
        type_transaction,
        amount_transaction,
        account_id: account_id,
       })


       if(error){
        return res.status(422).json({message: error})
       }

        this.registerTransactionService
            .execute(registerTransactionDto!)
            .then((response) => res.status(201).json(response))
            .catch((error) => this.handleError(error, res));
    };

    
    check_one_transaction = (req: Request, res: Response) => {
        const {  id_transaction } = req.params;
        this.checkTransactionService
            .execute( id_transaction)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res));
    };
    check_all_transaction = (req: Request, res: Response) => {
        const { id_account } = req.params;
        this.checkAllTransactionService
            .execute(id_account)
            .then((response) => res.status(200).json(response))
            .catch((error) => this.handleError(error, res));
    };
   
}