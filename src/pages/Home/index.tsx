import { useStore } from "effector-react";

import GetTransactionsUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import { Header } from "../../components/Header";

import { SearchForm } from "../../components/SearchForm";

import { Summary } from "../../components/Summary";

import { useState, useEffect } from "react";

import {
  HomeWrapper,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableEmpty,
} from "./styles";

import { TransactionValues } from "../../domains/transaction";

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);

  const [filteredResults, setFilteredResults] = useState<TransactionValues[]>([]);

  const handleSearch = (query: string) => {
    const lower = query.toLowerCase();

    const filtered = transactions.filter((t) => t.description.toLowerCase().includes(lower));

    setFilteredResults(filtered);
  };

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",

    currency: "BRL",
  });

  useEffect(() => {
    GetTransactionsUseCase.execute();
  }, []);

  return (
    <HomeWrapper>
      <Header />

      <Summary />

      <SearchForm onSearch={handleSearch} />

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <tr>
              <td>Descrição</td>
              <td>Preço</td>
              <td>Categoria</td>
              <td>Data</td>
            </tr>
          </thead>

          <tbody>
            {(filteredResults.length > 0 ? filteredResults : transactions).map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>

                <td>
                  <PriceHighlight variant={transaction.type === 0 ? "income" : "outcome"}>
                    {money.format(transaction.amount)}
                  </PriceHighlight>
                </td>

                <td>{transaction.category.description}</td>

                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>

        {!isLoading && transactions.length === 0 && (
          <TransactionsTableEmpty>
            Adicione uma categoria e a sua primeira transação :)
          </TransactionsTableEmpty>
        )}
      </TransactionsContainer>
    </HomeWrapper>
  );
}
