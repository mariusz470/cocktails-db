import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useCocktails } from "../context/CocktailContext";

const Like = ({ fav, id }) => {
  const { saveCocktail } = useCocktails();

  const [like, setLike] = useState(false);

  const likeButtonHandler = (e) => {
    // saveCocktail(id);
    console.log(id);
    setLike(!like);
  };
  if (fav) {
    setLike(true);
  }

  let icon = (
    <FavoriteBorderIcon
      className="btn btn-primary btn-details fav"
      onClick={() => likeButtonHandler()}
    />
  );

  if (like) {
    icon = (
      <FavoriteIcon
        className="btn btn-primary btn-details fav"
        onClick={() => likeButtonHandler()}
      />
    );
  }

  return <div className="like">{icon}</div>;
};

export default Like;
