import { RequestError } from "../../domains/requestError";
import { TransactionValues } from "../../domains/transaction";
import { TransactionService } from "../../services/TransactionService/TransactionService";
import { loadTransaction, loadTransactionDone, loadTransactionFail } from "../../stores/TransactionStore/TransactionEvents";


const execute = async (searchValue: string | null) => {
  loadTransaction();

  return TransactionService.seachTransactions(searchValue)

    .then((transactions: TransactionValues[]) => {
      loadTransactionDone(transactions);
    })

    .catch(({ hasError, message }: RequestError) => {
      loadTransactionFail({ hasError, message });
    });
};

export const SearchTransactionsUseCase = {
  execute,
};
