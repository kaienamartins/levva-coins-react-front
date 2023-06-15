import { useStore } from "effector-react";

import GetTransactionsUseCase from "../../useCases/GetTransactionsUseCase/GetTransactionsUseCase";

import TransactionStore from "../../stores/TransactionStore/TransactionStore";

import { Header } from "../../components/Header";

import { SearchForm } from "../../components/SearchForm";

import { Summary } from "../../components/Summary";

import { useEffect } from "react";

import {
  HomeWrapper,
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  TransactionsTableEmpty,
} from "./styles";
import { format } from "date-fns";

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);

  // const [filteredResults, setFilteredResults] = useState<TransactionValues[]>([]);

  // const handleSearch = (query: string) => {
  //   const lower = query.toLowerCase();

  //   const filtered = transactions.filter((t) => t.description.toLowerCase().includes(lower));

  //   setFilteredResults(filtered);
  // };

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",

    currency: "BRL",
  });

  const formattedDate = (dateString: any) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy");
  };

  useEffect(() => {
    GetTransactionsUseCase.execute();
  }, []);

  return (
    <HomeWrapper>
      <Header />

      <Summary />

      <SearchForm />

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
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type === 0 ? "income" : "outcome"}>
                    {money.format(transaction.amount)}
                  </PriceHighlight>
                </td>
                <td>{transaction.category.description}</td>
                {/* <td>{transaction.createdAt}</td> */}
                <td>{formattedDate(transaction.createdAt)}</td>
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
