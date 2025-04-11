import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain/dto/user/register_User.dto";
import { CheckAllAccountService } from "./services/check_accounts.service";
import { CheckOneAccountService } from "./services/check_one_account.service";
import { DeleteAccountService } from "./services/delete_account.service";
import { RegisterAccountService } from "./services/register_account.services";



export class ControllerAccount {
  constructor(
    private readonly registeraccountService:RegisterAccountService,
    private readonly checkAllAccountsServices: CheckAllAccountService,
    private readonly checkAccountServices: CheckOneAccountService,
    private readonly deleteAccount: DeleteAccountService,
  ) {}

  handleError = (error: Error, res: Response) => {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  };



register_account = (req: Request, res: Response)=> {
    const [error, registerUserDto] = RegisterUserDto.execute(req.body);
    if(error){
      return res.status(422).json({message: error})
        }
    this.registeraccountService
        .execute(registerUserDto!)
    .then((message) => res.status(201).json(message))
      .catch((err) => this.handleError(err, res));
  };

  checkAll = (req: Request, res: Response)=> {
    this.checkAllAccountsServices
    .execute()
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  checkOne = (req: Request, res: Response)=> {
    const {id} = req.params;
    
    this.checkAccountServices
    .execute(id)
    .then((data) => res.status(201).json(data))
    .catch((error) => this.handleError(error, res))
  };
  delete = (req: Request, res: Response)=> {
    const {id} = req.params;
    
    this.deleteAccount
    .execute(id)
    .then((data) => res.status(204).json(data))
    .catch((error) => this.handleError(error, res))
  };
}