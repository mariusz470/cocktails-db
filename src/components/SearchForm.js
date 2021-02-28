import React, { useEffect } from "react";
import { useCocktails } from "../context/CocktailContext";

const SearchForm = () => {
  const { setSearchTerm, fetchCocktails, setCocktails } = useCocktails();
  const searchValue = React.useRef("");

  useEffect(() => {
    searchValue.current.focus();
  }, []);
  useEffect(() => {
    fetchCocktails();
  }, [fetchCocktails, setCocktails, setSearchTerm]);

  function searchCocktail() {
    if (searchValue.current.value) {
      setSearchTerm(searchValue.current.value);
    } else {
      setSearchTerm("a");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div
          className="form-
        control"
        >
          <label htmlFor="name">Search your favorite cocktail </label>
          <input
            type="text"
            name="name"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};
export default SearchForm;
