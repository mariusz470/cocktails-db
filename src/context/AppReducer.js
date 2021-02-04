const AppReducer = (state, action) => {
  switch (action.type) {
    case "GET_COCKTAILS":
      return {
        ...state,
        loading: false,
        cocktails: action.payload,
      };
    case "ADD_FAV_COCKTAIL_ID":
      return {
        ...state,
        favCocktailsIds: [...state.favCocktailsIds, action.payload],
        savedCocktails: [
          ...state.savedCocktails,
          state.cocktails.find((item) => {
            return item.id === action.payload;
          }),
        ],
      };
    //   dodać case na saved cocktails żeby sprawdzić czy jest już ten cocktail w bazie jeśli jest to dać null
    case "DELETE_FAV_COCKTAIL_ID":
      return {
        ...state,
        favCocktailsIds: state.favCocktailsIds.filter(
          (cocktail) => cocktail !== action.payload
        ),
        savedCocktails: [
          state.savedCocktails.filter(
            (cocktail) => cocktail.id !== action.payload
          ),
        ],
      };
    case "TOGGLE_FAV_COCKTAIL":
      return {
        ...state,
        cocktails: [...state.cocktails, !action.payload.fav],
      };
    case "ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default AppReducer;
