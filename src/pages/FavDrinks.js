import React from "react";

import { useGlobalContext } from "../context-legacy";
import Loading from "../components/Loading";
import Cocktail from "../components/Cocktail";

const FavDrinks = () => {
  const {
    favDrinks,
    favCocktailsIds,
    setFavCocktailsIds,
    loading,
  } = useGlobalContext();

  const handleFavCocktail = (id) => {
    const newFavCocktailsIds = favCocktailsIds;
    const index = newFavCocktailsIds.indexOf(id);
    if (index > -1) {
      newFavCocktailsIds.splice(index, 1);
    } else {
      newFavCocktailsIds.push(id);
    }
    setFavCocktailsIds(newFavCocktailsIds);
  };

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
