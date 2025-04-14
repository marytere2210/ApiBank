import { Router } from "express";
import { ControllerTransaction } from "./controller-transaction";
import { CheckTransactionService } from "./services/check-Onetransaction.service";
import { RegisterTransactionService } from "./services/register-transaction.sercive";
import { CheckAllTransactionService } from "./services/check-Alltransaction.service";



export class RoutesTransaction {
  static get routes() {
    const router = Router();
    const registerTransactionService = new RegisterTransactionService();
    const checkTransactionService = new CheckTransactionService();
    const checkAllTransactionsService = new CheckAllTransactionService();

    const controller = new ControllerTransaction(
      registerTransactionService,
      checkTransactionService,
      checkAllTransactionsService
    );

    router.post("/", controller.register_transaction.bind(controller));
    router.get("/check_transaction/:id_transaction", controller.check_one_transaction.bind(controller));
    router.get("/check_all_transaction/:userId", controller.check_all_transaction.bind(controller));

    return router;
  }
}

export default RoutesTransaction.routes;

