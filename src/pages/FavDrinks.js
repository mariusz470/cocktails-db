import React from "react";

import Loading from "../components/Loading";
import Cocktail from "../components/Cocktail";
import { useCocktails } from "../context/CocktailContext";

const FavDrinks = () => {
  const { savedFavCocktails, favCocktailsIds, loading } = useCocktails();

  const favDrinks = favCocktailsIds.map((item) => {
    return savedFavCocktails.find((cocktail) => cocktail.id === item.id);
  });

  if (loading) {
    return <Loading />;
  }
  if (favDrinks.length < 1) {
    return (
      <h2 className="section-title">
        No cocktails added to your favourite list
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">cocktails</h2>
      <div className="cocktails-center">
        {favDrinks.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default FavDrinks;
