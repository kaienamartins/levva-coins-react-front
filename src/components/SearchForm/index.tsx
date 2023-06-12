import { MagnifyingGlass } from "phosphor-react";

import { SearchFormContainer } from "./styles";

import { useState } from "react";

export function SearchForm({ onSearch }: any) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleSearch();
  };

  return (
    <SearchFormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Busque por transacões"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />

      <button onClick={handleSearch}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
