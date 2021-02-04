import React, { createContext, useReducer } from "react";

import AppReducer from "./AppReducer";

const initialState = {
  loading: true,
  cocktails: [],
  favCocktailsIds: [],
  savedCocktails: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function fetchCocktails(searchTerm, favCocktailsIds) {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      const { drinks } = data;
      if (drinks) {
        const newCocktails = drinks.map((item) => {
          const cocktail = {
            id: item.idDrink,
            name: item.strDrink,
            image: item.strDrinkThumb,
            info: item.strAlcoholic,
            glass: item.strGlass,
          };
          cocktail.fav = favCocktailsIds.includes(cocktail.id);
          return cocktail;
        });
        dispatch({
          type: "GET_COCKTAILS",
          payload: newCocktails,
        });
      } else {
        const newCocktails = [];
        dispatch({
          type: "GET_COCKTAILS",
          payload: newCocktails,
        });
      }
    } catch (error) {
      dispatch({
        type: "GET_COCKTAILS_ERROR",
        payload: error,
      });
    }
  }
  function addFavCocktailId(id) {
    dispatch({
      type: "ADD_FAV_COCKTAIL_ID",
      payload: id,
    });
  }
  function deleteFavCocktailId(id) {
    dispatch({
      type: "DELETE_FAV_COCKTAIL_ID",
      payload: id,
    });
  }
  function toggleFavCocktail(id, cocktails) {
    const index = cocktails.indexOf(id);

    dispatch({
      type: "TOGGLE_FAV_COCKTAIL",
      payload: cocktails.index,
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        cocktails: state.cocktails,
        error: state.error,
        loading: state.loading,
        fetchCocktails,
        addFavCocktailId,
        deleteFavCocktailId,
        toggleFavCocktail,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
