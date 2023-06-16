import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domains/requestError";

import { NewTransactionParams, TransactionValues } from "../../domains/transaction";

const createTransaction = async ({
  description,

  amount,

  type,

  categoryId,
}: NewTransactionParams): Promise<TransactionValues> => {
  return Api.post({
    url: "/transaction",

    body: {
      description,

      amount,

      type,

      categoryId,
    },
  })

    .then((response) => {
      return response.data;
    })

    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const getTransactions = async (): Promise<TransactionValues[]> => {
  return Api.get({
    url: "/transaction",
  })

    .then((response) => {
      const transactions = response.data;

      return transactions.sort((a: any, b: any) => b.id - a.id);
    })

    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const seachTransactions = async (searchValue: string | null) => {
  if (searchValue === null || searchValue?.length <= 0) return getTransactions();

  return Api.get({
    url: "/transaction/search",

    config: {
      params: {
        query: searchValue,
      },
    },
  })

    .then((response) => response.data)

    .catch((error: AxiosError<RequestError>) => {
      throw error.response?.data;
    });
};

export const TransactionService = {
  createTransaction,

  getTransactions,

  seachTransactions,
};
