import React from "react";
import { Link } from "react-router-dom";
import Like from "./Like";

const Cocktail = ({ id, name, image, glass, info, fav }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <Link to={`/cocktail/${id}`}>
          <img src={image} alt={name} />
        </Link>
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          details
        </Link>
        <Like fav={fav} id={id} />
      </div>
    </article>
  );
};

export default Cocktail;
