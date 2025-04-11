import { Account } from "../../../data/postgres/models/account-models";
import { RegisterAccountDto } from "../../../domain/dto/account/registeraccountdto";
import { CustomError } from "../../../domain/errors/custom.error";
import { FinderUserService } from "../../user/services/finder-user-service";

export class RegisterAccountService {
  constructor(
    private readonly finderUserService: FinderUserService
  ) {}

  async execute(registerAccountDto: RegisterAccountDto, userId: string) {
    const { balance_account } = registerAccountDto;

    const user = await this.finderUserService.execute(userId);
    if (!user) {
      throw CustomError.notFound("Usuario no encontrado");
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
