import { Request, Response } from "express";
import { CheckAllAccountService } from "./services/check_accounts.service";
import { CheckOneAccountService } from "./services/check_one_account.service";
import { DeleteAccountService } from "./services/delete_account.service";
import { RegisterAccountService } from "./services/register_account.services";
import { RegisterAccountDto } from "../../domain/dto/account/registeraccountdto";
import { CustomError } from "../../domain/errors/custom.error";

export class ControllerAccount {
  constructor(
    private readonly registeraccountService:RegisterAccountService,
    private readonly checkAllAccountsServices: CheckAllAccountService,
    private readonly checkAccountServices: CheckOneAccountService,
    private readonly deleteAccount: DeleteAccountService,
  ) {}

  private handleError = (error: unknown, res: Response) => {
    if(error instanceof CustomError){
      return res.status(error.statusCode).json({message: error.message});
    }

    return res.status(500).json({message: 'Internal Server Error'});
  };
    
register_account = (req: Request, res: Response)=> {
  
    const { balance_account, type_account } = req.body;

    const [error, registerAccountDto] = RegisterAccountDto.execute({
      balance_account,
      type_account,
    });

    if (error) {
      return res.status(400).json({ message: error });
    }

    this.registeraccountService
      .execute(registerAccountDto!, req)
      .then((response) => res.status(201).json(response))
      .catch((error) => this.handleError(error, res));
  };

  check_all_accounts = (req: Request, res: Response) => {
    const { user } = req.params;
    this.checkAllAccountsServices
      .execute(user)
      .then((response) => res.status(200).json(response))
      .catch((error) => this.handleError(error, res));
  };

  check_one_account = (req: Request, res: Response) => {
    const { account_number } = req.params;
    this.checkAccountServices
      .execute(account_number)
      .then((response) => res.status(200).json(response))
      .catch((error) => this.handleError(error, res));
  };

  delete_account = (req: Request, res: Response) => {
    const { account_number } = req.params;
    this.deleteAccount
      .deleteAccount(account_number)
      .then((response) => res.status(200).json(response))
      .catch((error) => this.handleError(error, res));
  }
}