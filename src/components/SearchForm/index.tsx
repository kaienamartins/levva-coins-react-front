import { MagnifyingGlass } from "phosphor-react";

import { SearchFormContainer } from "./styles";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import { SearchTransactionsUseCase } from "../../useCases/SearchTransactionUseCase/SearchTransactionUseCase";

interface formData {
  search: string;
}
const formSchema = yup.object({
  search: yup.string(),
});

export function SearchForm() {
  //const [query, setQuery] = useState("");

  const { register, handleSubmit } = useForm<formData>({
    resolver: yupResolver(formSchema),
  });

  // const handleSearch = () => {
  //   onSearch(query);
  // };

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   handleSearch();
  // };

  const handleSearch = ({ search }: formData) => {
    SearchTransactionsUseCase.execute(search ? search.trim() : null);
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearch)}>
      <input
      {...register("search")}
        type="text"
        placeholder="Busque por transacões"
        // onChange={(e) => setQuery(e.target.value)}
        // value={query}
      />

      <button type="submit">
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
