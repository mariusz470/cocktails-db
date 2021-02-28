import React, { useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import { useCocktails } from "../context/CocktailContext";

const Like = ({ id, fav }) => {
  const { saveCocktailId } = useCocktails();

  const [like, setLike] = useState(fav);

  const likeButtonHandler = () => {
    saveCocktailId(id);
    setLike(!like);
  };

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
