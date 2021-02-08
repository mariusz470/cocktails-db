import React, { useContext, useState, useCallback } from "react";
// import { fetchCocktails } from "../services/cocktaildbService";

const CocktailsContext = React.createContext();

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

export function useCocktails() {
  return useContext(CocktailsContext);
}

export function CocktailsProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [cocktails, setCocktails] = useState([]);
  const [favCocktailsIds, setFavCocktailsIds] = useState([]);
  const [savedFavCocktails, setSavedFavCocktails] = useState([]);

  const fetchCocktails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();

      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);

  function saveCocktailId(id) {
    if (favCocktailsIds.some((item) => item.id === id)) {
      const deleted = favCocktailsIds.filter((item) => item.id !== id);
      setFavCocktailsIds(deleted);
    } else {
      const saved = [...favCocktailsIds, { id }];
      setFavCocktailsIds(saved);
    }
  }

  function saveFavCocktail(cocktail) {
    if (savedFavCocktails.some((item) => item.id === cocktail.id)) {
      return;
    } else {
      setSavedFavCocktails([...savedFavCocktails, cocktail]);
    }
  }

  return (
    <CocktailsContext.Provider
      value={{
        loading,
        cocktails,
        favCocktailsIds,
        savedFavCocktails,
        saveFavCocktail,
        setSearchTerm,
        fetchCocktails,
        saveCocktailId,
      }}
    >
      {children}
    </CocktailsContext.Provider>
  );
}
