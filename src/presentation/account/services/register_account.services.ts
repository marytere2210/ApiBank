import { Account } from "../../../data/postgres/models/account-models";
import { RegisterAccountDto } from "../../../domain/dto/account/registeraccountdto";
import { CustomError } from "../../../domain/errors/custom.error";
import { FinderUserService } from "../../user/services/finder-user-service";
import { Request } from "express";


export class RegisterAccountService {
  constructor(
    private readonly finderUserService: FinderUserService
  ) {}

  async execute(registerAccountDto: RegisterAccountDto, req:Request) {
    const { balance_account } = registerAccountDto;

    const user = req.user;
    if(!user) {
      throw CustomError.unAuthorized("Usuario no autorizado");
    }
    
    const account = new Account();
    account.balance_account = balance_account;
    account.user = user;

    if (account.balance_account < 0) {
      throw CustomError.badRequest("El saldo inicial no puede ser menor a 0");
    }

    try {
      await account.save();
      return {
        message: "Cuenta creada exitosamente"
      };
    } catch (error) {
      throw CustomError.internalServer("Error al crear la cuenta");
    }
  }
}
