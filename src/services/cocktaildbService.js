export async function fetchCocktails(searchTerm, favCocktailsIds) {
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
      return newCocktails;
    } else {
      return [];
    }
  } catch (error) {
    return error;
  }
}
