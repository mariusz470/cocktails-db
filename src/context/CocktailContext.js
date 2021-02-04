import React, { useContext, useState, useEffect, useCallback } from "react";
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
  const [savedCocktails, setSavedCocktails] = useState([]);

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
            fav: false,
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

  function saveCocktail(id) {
    let newFavCocktailsIds = favCocktailsIds;
    let newSavedCocktails = savedCocktails;
    let newCocktails = cocktails;

    let indexFav = newFavCocktailsIds.indexOf(id);
    let indexCocktails = newCocktails.findIndex((item) => item.id === id);
    if (!favCocktailsIds.includes(id)) {
      newFavCocktailsIds.push(id);
      setFavCocktailsIds(newFavCocktailsIds);
      console.log(favCocktailsIds);
      const foundCocktail = cocktails.find((item) => {
        return item.id === id;
      });
      newSavedCocktails.push(foundCocktail);
      setSavedCocktails(newSavedCocktails);
      console.log(savedCocktails);
      newCocktails = cocktails.map((item) =>
        item.id === id ? { ...item, fav: true } : item
      );
      setCocktails(newCocktails);
      console.log(cocktails);
    } else {
      newCocktails = cocktails.map((item) =>
        item.id === id ? { ...item, fav: false } : item
      );
      newFavCocktailsIds = favCocktailsIds.filter((item) => item !== id);
      //   setFavCocktailsIds(newFavCocktailsIds);
      console.log(newCocktails);
      console.log(newFavCocktailsIds);
      //   indexFav = newFavCocktailsIds.indexOf(id);
      //   indexCocktails = newCocktails.findIndex((item) => item.id === id);
      //   newSavedCocktails = savedCocktails.filter((item) => {
      //     return item.id !== id;
      //   });
      //   setSavedCocktails(newSavedCocktails);
      //   newCocktails[indexCocktails].fav = false;
      //   setCocktails(newCocktails);
    }

    //   const newFavCocktailsIds = favCocktailsIds;
    //   const newSavedCocktails = savedCocktails;
    //   const newCocktails = cocktails;
    //   const index = newCocktails.findIndex((item) => item.id === id);
    //   if (favCocktailsIds.includes(id)) {
    //     newFavCocktailsIds.filter((cocktail) => cocktail !== id);
    //     newSavedCocktails.filter((cocktail) => cocktail.id !== id);
    //     newCocktails[index].fav = false;
    //   } else {
    //     newFavCocktailsIds.push(id);
    //     const newCocktail = cocktails.find((item) => {
    //       return item.id === id;
    //     });
    //     newSavedCocktails.push(newCocktail);
    //     newCocktails[index].fav = true;
  }

  return (
    <CocktailsContext.Provider
      value={{
        loading,
        cocktails,
        favCocktailsIds,
        savedCocktails,
        setSearchTerm,
        fetchCocktails,
        saveCocktail,
      }}
    >
      {children}
    </CocktailsContext.Provider>
  );
}
