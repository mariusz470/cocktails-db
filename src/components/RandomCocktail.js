import React from "react";
import { Link } from "react-router-dom";

const RandomCocktail = () => {
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    async function getRandomCocktail() {
      try {
        const response = await fetch(
          "https://www.thecocktaildb.com/api/json/v1/1/random.php"
        );
        const data = await response.json();
        if (data.drinks) {
          const { idDrink } = data.drinks[0];

          setId(idDrink);
        } else {
          setId(null);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getRandomCocktail();
  }, [id]);

  return <Link to={`/cocktail/${id}`}>Random Cocktail</Link>;
};

export default RandomCocktail;
